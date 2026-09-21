/* Mobile enhancement of the original reference sheets. The existing checkboxes
   remain the source of truth, including their per-tier localStorage handlers. */
(function () {
  'use strict';

  var media = window.matchMedia('(max-width: 760px)');
  var domains = Array.from(document.querySelectorAll('.domain')).map(function (section) {
    return {
      id: section.id,
      title: section.querySelector('h2').textContent,
      description: section.querySelector('.domain-heading p').textContent,
      topics: Array.from(section.querySelectorAll('.sheet')).map(function (sheet) {
        return {
          code: sheet.dataset.code,
          title: sheet.querySelector('.sheet-title').textContent,
          sheet: sheet,
          checkbox: sheet.querySelector('input[type="checkbox"]'),
          search: sheet.textContent.toLowerCase(),
          domain: section.id,
          parent: sheet.parentNode,
          next: sheet.nextSibling
        };
      })
    };
  });
  if (!domains.length) return;
  var topics = domains.flatMap(function (domain) { return domain.topics; });
  var tier = /associate/i.test(document.title) ? 'Associate' : /developer/i.test(document.title) ? 'Developer' : 'Architect';
  var lastKey = 'academy-study-reader-last:' + location.pathname;
  var currentTopic = null;
  var route = { kind: 'overview' };

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function button(text, action, className) {
    var node = element('button', className || 'reader-button', text);
    node.type = 'button';
    node.addEventListener('click', action);
    return node;
  }
  function reviewed(topic) { return topic.checkbox.checked; }
  function count(items) { return items.filter(reviewed).length; }
  function domainFor(topic) { return domains.find(function (domain) { return domain.id === topic.domain; }); }
  function readRoute() {
    var hash;
    try { hash = decodeURIComponent(location.hash.slice(1)); } catch (_) { hash = ''; }
    var topic = topics.find(function (item) { return 's-' + item.code === hash; });
    if (topic) return { kind: 'topic', topic: topic };
    var domain = domains.find(function (item) { return item.id === hash; });
    if (domain) return { kind: 'domain', domain: domain };
    if (hash.startsWith('search=')) return { kind: 'search', query: hash.slice(7) };
    return { kind: 'overview' };
  }
  function navigate(hash) {
    history.pushState(null, '', location.pathname + location.search + (hash ? '#' + hash : ''));
    render(true);
  }
  function openTopic(topic) { navigate('s-' + topic.code); }
  function restoreTopic() {
    if (!currentTopic) return;
    currentTopic.parent.insertBefore(currentTopic.sheet, currentTopic.next);
    currentTopic = null;
  }

  var reader = element('main', 'study-reader');
  reader.hidden = true;
  var header = element('nav', 'reader-header');
  header.setAttribute('aria-label', 'Study map navigation');
  var academy = element('a', '', '← Academy');
  academy.href = './';
  var back = button('← All domains', function () {
    navigate(route.kind === 'topic' ? route.topic.domain : '');
  }, 'reader-back');
  header.append(academy, back);
  var content = element('div', 'reader-content');
  var title = element('h1', 'reader-title');
  title.tabIndex = -1;
  var subtitle = element('p', 'reader-subtitle');
  var overview = element('section', 'reader-overview');
  var progressText = element('p', 'reader-progress-text');
  var progress = element('progress', 'reader-progress');
  progress.max = topics.length;
  progress.setAttribute('aria-label', 'Topics reviewed');
  var searchLabel = element('label', 'reader-search-label', 'Search all topics');
  var search = element('input', 'reader-search');
  search.id = 'reader-search';
  search.type = 'search';
  search.placeholder = 'Search topics, tools, or concepts';
  searchLabel.htmlFor = search.id;
  var continueButton = button('Continue reviewing →', function () {
    var last;
    try { last = localStorage.getItem(lastKey); } catch (_) {}
    var candidate = topics.find(function (topic) { return topic.code === last && !reviewed(topic); });
    openTopic(candidate || topics.find(function (topic) { return !reviewed(topic); }) || topics[0]);
  }, 'reader-button reader-primary reader-continue');
  var settings = element('details', 'reader-settings');
  settings.append(element('summary', '', 'About & settings'));
  var explanation = document.querySelector('.legend');
  if (explanation) settings.append(element('p', '', explanation.textContent.trim()));
  settings.append(element('p', '', 'Review marks are saved in this browser. You can mark or unmark any topic.'));
  settings.append(button('Reset this map’s progress', function () {
    if (!window.confirm('Reset all review marks for this study map? This cannot be undone.')) return;
    document.getElementById('resetBtn').click();
    updateProgress();
    renderList();
  }, 'reader-button reader-reset'));
  overview.append(progressText, progress, searchLabel, search, continueButton, settings);

  var listHeading = element('h2', 'reader-list-heading');
  var resultStatus = element('p', 'reader-result-status');
  resultStatus.setAttribute('role', 'status');
  var list = element('div', 'reader-list');
  var topicPane = element('div', 'reader-topic');
  var topicActions = element('div', 'reader-topic-actions');
  var reviewButton = button('Mark as reviewed', function () {
    route.topic.checkbox.click();
    updateProgress();
  }, 'reader-button reader-primary reader-review');
  var pageNav = element('nav', 'reader-topic-nav');
  pageNav.setAttribute('aria-label', 'Topic navigation');
  var previous = button('← Previous topic', function () {
    openTopic(topics[topics.indexOf(route.topic) - 1]);
  });
  var next = button('Next topic →', function () {
    var index = topics.indexOf(route.topic);
    if (index < topics.length - 1) openTopic(topics[index + 1]);
    else navigate('');
  });
  pageNav.append(previous, next);
  topicActions.append(reviewButton, pageNav);
  content.append(title, subtitle, overview, listHeading, resultStatus, list, topicPane, topicActions);
  reader.append(header, content);
  document.body.append(reader);

  function updateProgress() {
    var total = count(topics);
    progressText.textContent = total + ' of ' + topics.length + ' topics reviewed';
    progress.value = total;
    continueButton.textContent = total === topics.length ? 'Review again →' : 'Continue reviewing →';
    if (route.kind === 'topic') {
      var done = reviewed(route.topic);
      reviewButton.textContent = done ? '✓ Reviewed — mark as unreviewed' : 'Mark as reviewed';
      reviewButton.setAttribute('aria-pressed', String(done));
    }
  }
  function row(titleText, detail, hash, done) {
    var link = element('a', 'reader-row');
    link.href = '#' + hash;
    var words = element('span', 'reader-row-words');
    words.append(element('strong', '', titleText), element('span', 'reader-row-detail', detail));
    var arrow = element('span', 'reader-row-arrow', '→');
    arrow.setAttribute('aria-hidden', 'true');
    link.append(words, arrow);
    if (done) link.classList.add('is-reviewed');
    link.addEventListener('click', function (event) {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigate(hash);
    });
    return link;
  }
  function renderList() {
    list.replaceChildren();
    resultStatus.textContent = '';
    if (route.kind === 'topic') return;
    if (route.kind === 'overview') {
      listHeading.textContent = 'Domains';
      domains.forEach(function (domain) {
        list.append(row(domain.title, count(domain.topics) + ' / ' + domain.topics.length + ' reviewed', domain.id));
      });
      return;
    }
    var matches = route.kind === 'domain' ? route.domain.topics : topics.filter(function (topic) {
      var terms = route.query.toLowerCase().trim().split(/\s+/);
      var text = topic.search + ' ' + domainFor(topic).title.toLowerCase();
      return terms.every(function (term) { return text.includes(term); });
    });
    listHeading.textContent = route.kind === 'search' ? 'Search results' : 'Topics';
    if (route.kind === 'search') resultStatus.textContent = matches.length ? matches.length + ' matching topics' : 'No matching topics. Try another word or clear the search.';
    matches.forEach(function (topic) {
      var detail = (reviewed(topic) ? '✓ Reviewed' : 'Not reviewed') + (route.kind === 'search' ? ' · ' + domainFor(topic).title : '');
      list.append(row(topic.code + ' · ' + topic.title, detail, 's-' + topic.code, reviewed(topic)));
    });
  }
  function render(focus) {
    if (!media.matches) return;
    restoreTopic();
    route = readRoute();
    var isTopic = route.kind === 'topic';
    var isOverview = route.kind === 'overview' || route.kind === 'search';
    back.hidden = route.kind === 'overview';
    back.textContent = isTopic ? '← ' + domainFor(route.topic).title : '← All domains';
    overview.hidden = !isOverview;
    listHeading.hidden = isTopic;
    list.hidden = isTopic;
    resultStatus.hidden = isTopic;
    topicPane.hidden = !isTopic;
    topicActions.hidden = !isTopic;
    title.textContent = isTopic ? route.topic.title : route.kind === 'domain' ? route.domain.title : tier + ' study map';
    subtitle.textContent = isTopic ? route.topic.code + ' · ' + domainFor(route.topic).title : route.kind === 'domain' ? route.domain.description : domains.length + ' domains · Review one topic at a time';
    search.value = route.kind === 'search' ? route.query : '';
    if (isTopic) {
      currentTopic = route.topic;
      topicPane.append(currentTopic.sheet);
      previous.disabled = topics.indexOf(currentTopic) === 0;
      next.textContent = topics.indexOf(currentTopic) === topics.length - 1 ? 'Back to overview →' : 'Next topic →';
      try { localStorage.setItem(lastKey, currentTopic.code); } catch (_) {}
    }
    renderList();
    updateProgress();
    if (focus) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      title.focus({ preventScroll: true });
    }
  }
  search.addEventListener('input', function () {
    var query = search.value;
    route = query.trim() ? { kind: 'search', query: query } : { kind: 'overview' };
    history.replaceState(null, '', location.pathname + location.search + (query.trim() ? '#search=' + encodeURIComponent(query) : ''));
    back.hidden = route.kind === 'overview';
    renderList();
  });
  // Native checkbox listeners run first and save to the original storage keys.
  document.addEventListener('change', function (event) {
    if (event.target.matches('.review-toggle input')) updateProgress();
  });
  function syncLayout() {
    restoreTopic();
    // A desktop search must not leave the mobile reader's source sheets hidden.
    var originalSearch = document.getElementById('searchInput');
    originalSearch.value = '';
    originalSearch.dispatchEvent(new Event('input'));
    document.body.classList.toggle('reader-active', media.matches);
    reader.hidden = !media.matches;
    if (media.matches) render(false);
    else {
      var destination = readRoute();
      if (destination.kind === 'topic') destination.topic.sheet.scrollIntoView({ block: 'start' });
    }
  }
  media.addEventListener('change', syncLayout);
  window.addEventListener('popstate', function () { render(true); });
  window.addEventListener('hashchange', function () { render(true); });
  syncLayout();
})();
