import { questions, dimensions, scopes, profiles, assessmentVersion, title, pageUrl } from './data.mjs'
export const points = Object.freeze({ A: 0, B: 1, C: 2, D: 3, U: null })
const level3 = [1, 2, 5, 7, 8]
const leaders = [1, 2, 3]
const tieOrder = [5, 8, 2, 7, 1, 3, 4, 6, 9, 10]
export const candidateLevel = total => total <= 7 ? 1 : total <= 15 ? 2 : total <= 23 ? 3 : 4
export const validAnswer = answer => Object.hasOwn(points, answer)
export function unmetRequirements(level, scores) {
  return questions.filter(q => level === 3 ? level3.includes(q.number) && scores[q.id] < 2 : scores[q.id] < (leaders.includes(q.number) ? 3 : 2)).map(q => q.id)
}
export function dimensionScores(answers) {
  return dimensions.map(d => {
    const members = questions.filter(q => d.numbers.includes(q.number))
    const known = members.every(q => validAnswer(answers[q.id]) && answers[q.id] !== 'U')
    return { ...d, maximum: members.length * 3, score: known ? members.reduce((sum, q) => sum + points[answers[q.id]], 0) : null }
  })
}
export function assess(answers, scope) {
  const missing = questions.filter(q => !validAnswer(answers[q.id])).map(q => q.id)
  const answeredCount = questions.length - missing.length
  if (!scopes.some(s => s.id === scope) || missing.length) return { status: 'incomplete', answeredCount, missing }
  const dims = dimensionScores(answers)
  const unknownIds = questions.filter(q => answers[q.id] === 'U').map(q => q.id)
  if (unknownIds.length) return { status: 'visibility_gaps', answeredCount, unknownIds, dimensions: dims }
  const scores = Object.fromEntries(questions.map(q => [q.id, points[answers[q.id]]]))
  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  const candidate = candidateLevel(total)
  let profile = candidate
  if (profile === 4 && unmetRequirements(4, scores).length) profile = 3
  if (profile === 3 && unmetRequirements(3, scores).length) profile = 2
  const limited = profile < candidate
  const limitingQuestionIds = limited ? unmetRequirements(profile + 1, scores) : []
  const sort = ids => [...ids].sort((a, b) => scores[a] - scores[b] || tieOrder.indexOf(questions.find(q => q.id === a).number) - tieOrder.indexOf(questions.find(q => q.id === b).number))
  const recommendationIds = [...sort(limitingQuestionIds), ...sort(questions.filter(q => !limitingQuestionIds.includes(q.id) && scores[q.id] < 3).map(q => q.id))].slice(0, 2)
  return { status: 'complete', answeredCount, scores, total, candidate, profile, limited, limitingQuestionIds, recommendationIds, dimensions: dims }
}
export function requirementText(result, id) {
  const q = questions.find(q => q.id === id)
  const minimum = result.profile === 2 ? 'C' : leaders.includes(q.number) ? 'D' : 'C'
  return `Q${q.number}. ${q.text} — Required practice: ${q.options.find(o => o.id === minimum).text}`
}
export function copyResults({ result, answers, scope, scopeName, priority, workflow, date }) {
  if (result.status === 'incomplete') return ''
  const lines = [title, `Assessment version: ${assessmentVersion}`, `Date generated: ${date}`, `Scope: ${scopes.find(s => s.id === scope).text}${scopeName ? ' — ' + scopeName : ''}`]
  if (result.status === 'complete') lines.push(`Profile: ${profiles[result.profile - 1].name}`, `Self-assessment score: ${result.total} / 30`, profiles[result.profile - 1].description, `Next move: ${profiles[result.profile - 1].nextMove}`)
  else lines.push('Assessment complete — visibility gaps')
  lines.push('', ...result.dimensions.map(d => `${d.label} (Q${d.numbers.join(', Q')}): ${d.score === null ? 'Not enough information' : `${d.score} / ${d.maximum}`}`), '', ...questions.map(q => `Q${q.number}. ${q.text}\n${q.options.find(o => o.id === answers[q.id]).text}`))
  if (result.limited) lines.push('', 'Unmet profile requirements', ...result.limitingQuestionIds.map(id => requirementText(result, id)))
  if (result.recommendationIds?.length) lines.push('', 'Improvement priorities', ...result.recommendationIds.map(id => questions.find(q => q.id === id).recommendation))
  if (result.unknownIds) lines.push('', 'Establish these answers', ...result.unknownIds.map(id => { const q = questions.find(q => q.id === id); return `Q${q.number}. ${q.text} — Ask: ${q.owner}` }))
  if (priority || workflow) lines.push('', 'Your chosen next step', ...[priority, workflow].filter(Boolean))
  lines.push('', pageUrl)
  return lines.join('\n')
}
