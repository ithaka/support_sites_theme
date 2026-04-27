document.addEventListener('DOMContentLoaded', function() {
  function closest (element, selector) {
    if (Element.prototype.closest) {
      return element.closest(selector);
    }
    do {
      if (Element.prototype.matches && element.matches(selector)
        || Element.prototype.msMatchesSelector && element.msMatchesSelector(selector)
        || Element.prototype.webkitMatchesSelector && element.webkitMatchesSelector(selector)) {
        return element;
      }
      element = element.parentElement || element.parentNode;
    } while (element !== null && element.nodeType === 1);
    return null;
  }

  // social share popups
  Array.prototype.forEach.call(document.querySelectorAll('.share a'), function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      window.open(this.href, '', 'height = 500, width = 500');
    });
  });

  // show form controls when the textarea receives focus or backbutton is used and value exists
  var commentContainerTextarea = document.querySelector('.comment-container textarea'),
    commentContainerFormControls = document.querySelector('.comment-form-controls, .comment-ccs');

  if (commentContainerTextarea) {
    commentContainerTextarea.addEventListener('focus', function focusCommentContainerTextarea() {
      commentContainerFormControls.style.display = 'block';
      commentContainerTextarea.removeEventListener('focus', focusCommentContainerTextarea);
    });

    if (commentContainerTextarea.value !== '') {
      commentContainerFormControls.style.display = 'block';
    }
  }

  // Expand Request comment form when Add to conversation is clicked
  var showRequestCommentContainerTrigger = document.querySelector('.request-container .comment-container .comment-show-container'),
    requestCommentFields = document.querySelectorAll('.request-container .comment-container .comment-fields'),
    requestCommentSubmit = document.querySelector('.request-container .comment-container .request-submit-comment');

  if (showRequestCommentContainerTrigger) {
    showRequestCommentContainerTrigger.addEventListener('click', function() {
      showRequestCommentContainerTrigger.style.display = 'none';
      Array.prototype.forEach.call(requestCommentFields, function(e) { e.style.display = 'block'; });
      requestCommentSubmit.style.display = 'inline-block';

      if (commentContainerTextarea) {
        commentContainerTextarea.focus();
      }
    });
  }

  // Mark as solved button
  var requestMarkAsSolvedButton = document.querySelector('.request-container .mark-as-solved:not([data-disabled])'),
    requestMarkAsSolvedCheckbox = document.querySelector('.request-container .comment-container input[type=checkbox]'),
    requestCommentSubmitButton = document.querySelector('.request-container .comment-container input[type=submit]');

  if (requestMarkAsSolvedButton) {
    requestMarkAsSolvedButton.addEventListener('click', function () {
      requestMarkAsSolvedCheckbox.setAttribute('checked', true);
      requestCommentSubmitButton.disabled = true;
      this.setAttribute('data-disabled', true);
      // Element.closest is not supported in IE11
      closest(this, 'form').submit();
    });
  }

  // Change Mark as solved text according to whether comment is filled
  var requestCommentTextarea = document.querySelector('.request-container .comment-container textarea');

  if (requestCommentTextarea) {
    requestCommentTextarea.addEventListener('input', function() {
      if (requestCommentTextarea.value === '') {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-translation');
        }
        requestCommentSubmitButton.disabled = true;
      } else {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-and-submit-translation');
        }
        requestCommentSubmitButton.disabled = false;
      }
    });
  }

  // Disable submit button if textarea is empty
  if (requestCommentTextarea && requestCommentTextarea.value === '') {
    requestCommentSubmitButton.disabled = true;
  }

  // Submit requests filter form in the request list page
  Array.prototype.forEach.call(document.querySelectorAll('#request-status-select, #request-organization-select'), function(el) {
    el.addEventListener('change', function(e) {
      e.stopPropagation();
      closest(this, 'form').submit();
    });
  });

  function toggleNavigation(toggleElement) {
    var menu = document.getElementById('user-nav');
    var isExpanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', !isExpanded);
    toggleElement.setAttribute('aria-expanded', !isExpanded);
  }

  var burgerMenu = document.querySelector('.header .icon-menu');
  var userMenu = document.querySelector('#user-nav');

  burgerMenu.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleNavigation(this);
  });

  burgerMenu.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) { // Enter key
      e.stopPropagation();
      toggleNavigation(this);
    }
  });

  userMenu.addEventListener('keyup', function(e) {
    if (e.keyCode === 27) { // Escape key
      e.stopPropagation();
      this.setAttribute('aria-expanded', false);
      burgerMenu.setAttribute('aria-expanded', false);
    }
  });

  if (userMenu.children.length === 0) {
    burgerMenu.style.display = 'none';
  }

  // Submit organization form in the request page
  var requestOrganisationSelect = document.querySelector('#request-organization select');

  if (requestOrganisationSelect) {
    requestOrganisationSelect.addEventListener('change', function() {
      closest(this, 'form').submit();
    });
  }

  // Toggles expanded aria to collapsible elements
  Array.prototype.forEach.call(document.querySelectorAll('.collapsible-nav, .collapsible-sidebar'), function(el) {
    el.addEventListener('click', function(e) {
      e.stopPropagation();
      var isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
    });
  });
  //Prefill Subject with anem of selected form  
var selected_form = $('#request_issue_type_select :selected').text();
$('#request_subject').val(selected_form);
  // Automatically check Agree to use cookies checkbox so it is an opt-out field
window.onload = function() {
  var checkbox = document.getElementById('request_custom_fields_15309688784535');
  if (checkbox) {
    checkbox.checked = true;
  }
};

  // Hide specific form fields
$('#request_subject').hide(); // hide the box you fill in
$('.form-field label:contains("Subject")').hide(); // hide the text above the box
  
$('#upload-dropzone').hide(); // hide the upload attachments button
$('.form-field label:contains("Attachments")').hide();
  

$('#request_custom_fields_15309856099735').hide(); // hide the box you fill in
$('.form-field label:contains("Request Time")').hide(); // hide the text above the box

$('#request_custom_fields_15309841262999').hide(); // hide the box you fill in
$('.form-field label:contains("Referrer")').hide(); // hide the text above the box
  
$('#request_custom_fields_15309704240023').hide(); // hide the box you fill in
$('.form-field label:contains("JSTOR Session ID")').hide(); // hide the text above the box
  
$('#request_custom_fields_15309728982935').hide(); // hide the box you fill in
$('.form-field label:contains("Institution Name")').hide(); // hide the text above the box


$('#request_custom_fields_15309762517015').hide(); // hide the box you fill in
$('.form-field label:contains("myJSTOR User ID")').hide(); // hide the text above the box


$('#request_custom_fields_15309775096983').hide(); // hide the box you fill in
$('.form-field label:contains("myJSTOR Email")').hide(); // hide the text above the box
  
$('#request_custom_fields_15347647105943').hide(); // hide the box you fill in
$('.form-field label:contains("User Agent")').hide(); // hide the text above the box

  
// Select all checkbox elements on the page except for the excluded field
const checkboxes = document.querySelectorAll('.form-field.boolean.optional:not(.request_custom_fields_15309688784535)');
if (checkboxes.length > 0) {
  const parentForm = checkboxes[0].parentNode;

  // Create a new container for the checkboxes
  const checkboxContainer = document.createElement("div");
  checkboxContainer.classList.add('checkbox-container');

  // Insert the new container before the first checkbox
  parentForm.insertBefore(checkboxContainer, checkboxes[0]);

  // Apply CSS styles to the container for alignment
  checkboxContainer.style.display = 'flex';
  checkboxContainer.style.flexWrap = 'wrap';
  checkboxContainer.style.justifyContent = 'space-between';

  // Loop through each checkbox
  checkboxes.forEach((checkbox) => {
    // Move the checkbox inside the new container
    checkboxContainer.appendChild(checkbox);

    // Apply CSS styles to the checkbox for alignment
    checkbox.style.margin = '10px';
    checkbox.style.width = 'calc(20% - 20px)';
  });
}
//Allow more versitiltiy in populating fields with url paremeters from https://support.zendesk.com/hc/en-us/articles/4408839114522-Creating-pre-filled-ticket-forms comment by 
//Mike Martello 
src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"

  $(document).ready(function() {
    var url = window.location.href;
    if (url.includes('fields') == true) {
      var queryDict = {};
      location.search.substr(1).split("&").forEach(
        function(item) {
          queryDict[item.split("=")[0]] = item.split("=")[1];
        }
      );
      try {
        var fields = queryDict.fields.split("|");
        fields.forEach(function(field) {
          var thisField = field.split(",");
          document.getElementById(thisField[0]).value = thisField[1];
        });
      }
      catch (error) {
        // Handle the error if fields or specific elements are not found
        console.error(error);
      }
    }
  });



  // If a section has more than 6 subsections, we collapse the list, and show a trigger to display them all
  const seeAllTrigger = document.querySelector("#see-all-sections-trigger");
  const subsectionsList = document.querySelector(".section-list");

  if (subsectionsList && subsectionsList.children.length > 6) {
    seeAllTrigger.setAttribute("aria-hidden", false);

    seeAllTrigger.addEventListener("click", function(e) {
      subsectionsList.classList.remove("section-list--collapsed");
      seeAllTrigger.parentNode.removeChild(seeAllTrigger);
    });
  }
});

/* PDF_ACCESSIBILITY_FORM_START */

(function pdfAccessibilityRequestForm() {
  const TARGET_FORM_ID = '39817828224791';
  const ISSUE_FIELD_IDS = [39817806847255, 39817773526295, 39817789561367, 39817836499863, 39817836508311, 39817836530327, 39817789610135, 39817828190359, 39817789634839, 39817836571543];
  const SELECTORS = {"stable": "input[name=\"request[custom_fields][39817789530647]\"]", "customName": "input[name=\"request[custom_fields][39817760991895]\"]", "iid": "input[name=\"request[custom_fields][39817789539607]\"]", "description": "textarea[name=\"request[description]\"]", "subject": "input[name=\"request[subject]\"]", "builtinEmail": "input[name=\"request[anonymous_requester_email]\"]", "builtinName": "input[name=\"request[name]\"]", "ticketForm": "input[name=\"request[ticket_form_id]\"]"};
  const CONSTANT_SUBJECT = 'Report PDF accessibility issues';

  function checkboxSelector(fieldId) {
    return `input[type="checkbox"][name="request[custom_fields][${fieldId}]"]`;
  }

  function getUrlParameter(name) {
    const fullQueryString = window.location.href.split('?')[1];
    if (!fullQueryString) return null;
    const chunks = fullQueryString.split('/');
    for (const chunk of chunks) {
      try {
        const params = new URLSearchParams(chunk);
        if (params.has(name)) return params.get(name);
      } catch {}
      const match = chunk.match(new RegExp('(?:^|[?&])' + name + '=([^&/]+)', 'i'));
      if (match) return match[1];
    }
    return null;
  }

  function currentFormId() {
    try {
      const fromQuery = new URLSearchParams(window.location.search).get('ticket_form_id');
      if (fromQuery) return String(fromQuery);
    } catch {}
    const hidden = document.querySelector(SELECTORS.ticketForm);
    return hidden && hidden.value ? String(hidden.value) : '';
  }

  function isTargetForm() {
    return currentFormId() === TARGET_FORM_ID
      || !!document.querySelector(SELECTORS.stable)
      || !!document.querySelector(SELECTORS.iid);
  }

  function requestForm() {
    return document.getElementById('new_request')
      || document.querySelector('#new-request-form form')
      || document.querySelector('form.request-form');
  }

  function closestField(el) {
    if (!el) return null;
    return el.closest('.form-field')
      || el.closest('[data-garden-id="forms.field"]')
      || el.closest('[data-garden-id="dropdowns.combobox.field"]')
      || el.closest('[data-garden-id="forms.fieldset"]')
      || el.parentElement;
  }

  function hideEl(el) {
    if (!el) return;
    el.style.display = 'none';
    el.style.visibility = 'hidden';
    el.setAttribute('aria-hidden', 'true');
  }

  function setValue(selector, value) {
    if (value == null) return;
    const input = document.querySelector(selector);
    if (!input) return;
    if (input.value === value) return;
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function normalizeStableUrl(value) {
    if (!value) return '';
    const trimmed = decodeURIComponent(String(value)).trim();
    if (!trimmed) return '';
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    const normalized = trimmed.replace(/^\/+/, '').replace(/^stable\//i, '');
    const communityParam = (getUrlParameter('community') || '').trim().toLowerCase();
    const isCommunity = communityParam === 'true' || communityParam === '1';
    return isCommunity
      ? 'https://www.jstor.org/stable/community.' + normalized
      : 'https://www.jstor.org/stable/' + normalized;
  }

  function setFieldLabel(input, labelText) {
    const field = closestField(input);
    if (!field) return;
    const label = field.querySelector('label, [data-garden-id="forms.label"], [data-garden-id="dropdowns.combobox.label"]');
    if (label) label.textContent = labelText;
  }

  function setFieldDescription(input, text) {
    const field = closestField(input);
    if (!field) return;
    let desc = field.querySelector('.pdf-a11y-field-description');
    if (!desc) {
      desc = document.createElement('div');
      desc.className = 'pdf-a11y-field-description';
      const label = field.querySelector('label, [data-garden-id="forms.label"], [data-garden-id="dropdowns.combobox.label"]');
      if (label && label.parentNode) label.parentNode.insertAdjacentElement('afterend', desc);
      else field.insertBefore(desc, field.firstChild);
    }
    desc.textContent = text;
  }

  function ensureIntro() {
    const form = requestForm();
    const mount = form && (form.closest('.form') || form.parentElement);
    if (!form || !mount || mount.querySelector('.pdf-a11y-intro')) return;
    const intro = document.createElement('section');
    intro.className = 'pdf-a11y-intro';
    const parts = [];
    if (!document.querySelector('.contactusheader')) {
      parts.push('<div class="pdf-a11y-kicker">CONTACT US</div>');
    }
    parts.push(
      '<h2>Report PDF accessibility issues</h2>',
      '<p>If you are experiencing accessibility issues with a JSTOR PDF, use this form to let us know. Our team will review your report and update the document as needed.</p>',
      '<p class="pdf-a11y-required">* All fields are required</p>'
    );
    intro.innerHTML = parts.join('');
    mount.insertBefore(intro, form);
  }

  function ensureWhatHappensNext() {
    const form = requestForm();
    if (!form || form.querySelector('.pdf-a11y-what-next')) return;
    const block = document.createElement('div');
    block.className = 'pdf-a11y-what-next';
    block.innerHTML = '<strong>What happens next:</strong> Your report will be reviewed by our team and we will work to resolve the issues you identified. We will email you the updated file and reach out if we need clarification. The improved version will also be available at the same download link in X days once updates are complete.';
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    const submitMount = submitButton && (
      submitButton.closest('.form-footer')
      || submitButton.closest('.request-form-footer')
      || submitButton.closest('.form-field')
      || submitButton
    );
    if (submitMount && submitMount.parentNode) {
      submitMount.parentNode.insertBefore(block, submitMount);
    } else {
      form.appendChild(block);
    }
  }

  function ensureIssueGroup() {
    const firstIssue = document.querySelector(checkboxSelector(ISSUE_FIELD_IDS[0]));
    const firstField = closestField(firstIssue);
    if (!firstField) return;
    let group = document.querySelector('.pdf-a11y-issue-group');
    if (!group) {
      group = document.createElement('div');
      group.className = 'pdf-a11y-issue-group';
      group.innerHTML = '<div class="pdf-a11y-issue-heading">WHAT ACCESSIBILITY ISSUES DID YOU ENCOUNTER? (SELECT ALL THAT APPLY)</div><div class="pdf-a11y-issue-error" role="alert" hidden>Select at least one issue.</div>';
      firstField.parentNode.insertBefore(group, firstField);
    }
    ISSUE_FIELD_IDS.forEach((fieldId) => {
      const input = document.querySelector(checkboxSelector(fieldId));
      const field = closestField(input);
      if (!field) return;
      field.classList.add('pdf-a11y-issue-field');
      if (field.previousElementSibling !== group) group.parentNode.insertBefore(field, group.nextSibling);
    });
  }

  function moveFieldAfter(input, referenceField) {
    const field = closestField(input);
    if (!field || !referenceField || !referenceField.parentNode) return referenceField;
    referenceField.parentNode.insertBefore(field, referenceField.nextSibling);
    return field;
  }

  function configureBuiltinRequesterFields() {
    const description = document.querySelector(SELECTORS.description);
    const descriptionField = closestField(description);
    let anchor = descriptionField;

    const builtinEmail = document.querySelector(SELECTORS.builtinEmail);
    if (builtinEmail) {
      setFieldLabel(builtinEmail, 'YOUR EMAIL ADDRESS');
      setFieldDescription(builtinEmail, 'We will use this to contact you about your report.');
      anchor = moveFieldAfter(builtinEmail, anchor) || anchor;
    }

    const builtinName = document.querySelector(SELECTORS.builtinName);
    if (builtinName) {
      setFieldLabel(builtinName, 'YOUR NAME');
      setFieldDescription(builtinName, 'We will use this to contact you about your report.');
      anchor = moveFieldAfter(builtinName, anchor) || anchor;
      const customNameField = closestField(document.querySelector(SELECTORS.customName));
      if (customNameField) hideEl(customNameField);
      return;
    }

    const customName = document.querySelector(SELECTORS.customName);
    if (customName) {
      setFieldLabel(customName, 'YOUR NAME');
      setFieldDescription(customName, 'We will use this to contact you about your report.');
      moveFieldAfter(customName, anchor);
    }
  }

  function hideAttachmentsField() {
    const form = requestForm();
    if (!form) return;
    const fileInputs = form.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => hideEl(closestField(input)));
    const attachmentLike = Array.from(form.querySelectorAll('*')).filter((node) => {
      const text = (node.textContent || '').trim();
      return /^attachments?$/i.test(text) || /drag.*drop/i.test(text) || /upload file/i.test(text);
    });
    attachmentLike.forEach((node) => hideEl(closestField(node) || node));
  }

  function decorateFields() {
    const subject = document.querySelector(SELECTORS.subject);
    if (subject) {
      setValue(SELECTORS.subject, CONSTANT_SUBJECT);
      hideEl(closestField(subject));
    }

    const iid = document.querySelector(SELECTORS.iid);
    if (iid) {
      hideEl(closestField(iid));
      const password = getUrlParameter('password');
      if (password) setValue(SELECTORS.iid, decodeURIComponent(password));
    }

    const stable = document.querySelector(SELECTORS.stable);
    if (stable) {
      setFieldLabel(stable, 'ITEM LINK (STABLE URL)');
      setFieldDescription(stable, 'You can copy this from the PDF cover page. It usually looks like: https://www.jstor.org/stable/...');
      const stableParam = getUrlParameter('stable');
      const stableValue = normalizeStableUrl(stableParam);
      if (stableValue) setValue(SELECTORS.stable, stableValue);
    }

    const description = document.querySelector(SELECTORS.description);
    if (description) {
      setFieldLabel(description, 'DESCRIBE THE SPECIFIC PROBLEMS YOU ENCOUNTERED');
      setFieldDescription(description, 'Please include page numbers and describe what you were trying to do when you experienced the issue.');
      description.placeholder = 'Example: The table on page 3 does not have headers and I cannot access it with my screen reader.';
    }

    configureBuiltinRequesterFields();
    hideAttachmentsField();
  }

  function hideFormSelectorAndGenericCopy() {
    const legacySelect = document.getElementById('request_issue_type_select');
    if (legacySelect) hideEl(closestField(legacySelect));
    const genericLines = Array.from(document.querySelectorAll('.request-main *')).filter((node) => {
      const text = (node.textContent || '').trim();
      return text === 'Fields marked with an asterisk (*) are required.' || text === 'Submit a request';
    });
    genericLines.forEach(hideEl);
  }

  function validateIssues(form) {
    const checked = ISSUE_FIELD_IDS.some((fieldId) => {
      const input = document.querySelector(checkboxSelector(fieldId));
      return !!(input && input.checked);
    });
    const error = document.querySelector('.pdf-a11y-issue-error');
    if (error) error.hidden = checked;
    return checked;
  }

  function bindValidation() {
    const form = requestForm();
    if (!form || form.dataset.pdfA11yBound === 'true') return;
    form.dataset.pdfA11yBound = 'true';
    form.addEventListener('submit', function (event) {
      const issuesValid = validateIssues(form);
      if (!issuesValid) {
        event.preventDefault();
        event.stopPropagation();
        const heading = document.querySelector('.pdf-a11y-issue-heading');
        if (heading) heading.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }, true);
    form.addEventListener('change', function () {
      validateIssues(form);
    });
  }

  function applyDecorations() {
    const active = isTargetForm();
    document.body.classList.toggle('pdf-a11y-form-active', active);
    if (!active) return;
    ensureIntro();
    ensureWhatHappensNext();
    ensureIssueGroup();
    decorateFields();
    hideFormSelectorAndGenericCopy();
    bindValidation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(applyDecorations, 0);
    });
  } else {
    setTimeout(applyDecorations, 0);
  }

  const mount = requestForm() || document.querySelector('.form-container') || document.querySelector('.form');
  if (mount && window.MutationObserver) {
    const mo = new MutationObserver(function () {
      clearTimeout(mo.__t);
      mo.__t = setTimeout(applyDecorations, 75);
    });
    mo.observe(mount, { childList: true, subtree: true, attributes: true });
  }

  document.addEventListener('change', function (event) {
    const target = event.target;
    if (target && (target.id === 'request_issue_type_select' || target.name === 'request[ticket_form_id]')) {
      setTimeout(applyDecorations, 0);
    }
  });
})();
/* PDF_ACCESSIBILITY_FORM_END */

/* IMAGE_DESCRIPTION_FEEDBACK_FORM_START */

(function imageDescriptionFeedbackForm() {
  const TARGET_FORM_ID = '39817789826327';
  const ISSUE_FIELD_IDS = [39817836603927, 39817773665047, 39817773686935, 39817828289047, 39817807034775, 39817773790231, 39817807084055, 39817789808023, 39817789818135];
  const SELECTORS = {"stable": "input[name=\"request[custom_fields][39817821517207]\"]", "customName": "input[name=\"request[custom_fields][39817836596247]\"]", "description": "textarea[name=\"request[description]\"]", "subject": "input[name=\"request[subject]\"]", "builtinEmail": "input[name=\"request[anonymous_requester_email]\"]", "builtinName": "input[name=\"request[name]\"]", "ticketForm": "input[name=\"request[ticket_form_id]\"]"};
  const CONSTANT_SUBJECT = "Help us improve this image description";

  function checkboxSelector(fieldId) {
    return `input[type="checkbox"][name="request[custom_fields][${fieldId}]"]`;
  }

  function getUrlParameter(name) {
    const fullQueryString = window.location.href.split('?')[1];
    if (!fullQueryString) return null;
    const chunks = fullQueryString.split('/');
    for (const chunk of chunks) {
      try {
        const params = new URLSearchParams(chunk);
        if (params.has(name)) return params.get(name);
      } catch {}
      const match = chunk.match(new RegExp('(?:^|[?&])' + name + '=([^&/]+)', 'i'));
      if (match) return match[1];
    }
    return null;
  }

  function currentFormId() {
    try {
      const fromQuery = new URLSearchParams(window.location.search).get('ticket_form_id');
      if (fromQuery) return String(fromQuery);
    } catch {}
    const hidden = document.querySelector(SELECTORS.ticketForm);
    return hidden && hidden.value ? String(hidden.value) : '';
  }

  function isTargetForm() {
    return currentFormId() === TARGET_FORM_ID || !!document.querySelector(SELECTORS.stable);
  }

  function requestForm() {
    return document.getElementById('new_request')
      || document.querySelector('#new-request-form form')
      || document.querySelector('form.request-form');
  }

  function closestField(el) {
    if (!el) return null;
    return el.closest('.form-field')
      || el.closest('[data-garden-id="forms.field"]')
      || el.closest('[data-garden-id="dropdowns.combobox.field"]')
      || el.closest('[data-garden-id="forms.fieldset"]')
      || el.parentElement;
  }

  function hideEl(el) {
    if (!el) return;
    el.style.display = 'none';
    el.style.visibility = 'hidden';
    el.setAttribute('aria-hidden', 'true');
  }

  function setValue(selector, value) {
    if (value == null) return;
    const input = document.querySelector(selector);
    if (!input) return;
    if (input.value === value) return;
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function normalizeStableUrl(value) {
    if (!value) return '';
    const trimmed = decodeURIComponent(String(value)).trim();
    if (!trimmed) return '';
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    let normalized = trimmed
      .replace(/^\/+/, '')
      .replace(/^stable\//i, '')
      .replace(/^community\./i, '');
    normalized = normalized.replace(/^www\.jstor\.org\/stable\//i, '');
    return 'https://www.jstor.org/stable/' + (
      /^community\./i.test(normalized) ? normalized : 'community.' + normalized
    );
  }

  function setFieldLabel(input, labelText) {
    const field = closestField(input);
    if (!field) return;
    const label = field.querySelector('label, [data-garden-id="forms.label"], [data-garden-id="dropdowns.combobox.label"]');
    if (label) label.textContent = labelText;
  }

  function setFieldDescription(input, text) {
    const field = closestField(input);
    if (!field) return;
    let desc = field.querySelector('.image-description-field-description');
    if (!desc) {
      desc = document.createElement('div');
      desc.className = 'image-description-field-description';
      const label = field.querySelector('label, [data-garden-id="forms.label"], [data-garden-id="dropdowns.combobox.label"]');
      if (label && label.parentNode) label.parentNode.insertAdjacentElement('afterend', desc);
      else field.insertBefore(desc, field.firstChild);
    }
    desc.textContent = text;
  }

  function ensureIntro() {
    const form = requestForm();
    const mount = form && (form.closest('.form') || form.parentElement);
    if (!form || !mount || mount.querySelector('.image-description-intro')) return;
    const intro = document.createElement('section');
    intro.className = 'image-description-intro';
    const parts = [];
    if (!document.querySelector('.contactusheader')) {
      parts.push('<div class="image-description-kicker">CONTACT US</div>');
    }
    parts.push(
      '<h2>Help us improve this image description</h2>',
      '<p>The image description was generated with AI and may contain inaccuracies. If the description doesn\'t match the image or misses important information, please describe the issue.</p>',
      '<p class="image-description-required">* All fields are required</p>'
    );
    intro.innerHTML = parts.join('');
    mount.insertBefore(intro, form);
  }

  function ensureIssueGroup() {
    const firstIssue = document.querySelector(checkboxSelector(ISSUE_FIELD_IDS[0]));
    const firstField = closestField(firstIssue);
    if (!firstField) return;
    let group = document.querySelector('.image-description-issue-group');
    if (!group) {
      group = document.createElement('div');
      group.className = 'image-description-issue-group';
      group.innerHTML = '<div class="image-description-issue-heading">WHAT&#8217;S WRONG WITH THIS ALTERNATIVE TEXT? (SELECT ALL THAT APPLY)*</div><div class="image-description-issue-error" role="alert" hidden>Select at least one issue.</div>';
      firstField.parentNode.insertBefore(group, firstField);
    }

    let anchor = group;
    ISSUE_FIELD_IDS.forEach((fieldId) => {
      const input = document.querySelector(checkboxSelector(fieldId));
      const field = closestField(input);
      if (!field) return;
      field.classList.add('image-description-issue-field');
      if (anchor.parentNode && anchor.nextSibling !== field) {
        anchor.parentNode.insertBefore(field, anchor.nextSibling);
      }
      anchor = field;
    });
  }

  function moveFieldAfter(input, referenceField) {
    const field = closestField(input);
    if (!field || !referenceField || !referenceField.parentNode) return referenceField;
    referenceField.parentNode.insertBefore(field, referenceField.nextSibling);
    return field;
  }

  function configureBuiltinRequesterFields() {
    const description = document.querySelector(SELECTORS.description);
    const descriptionField = closestField(description);
    let anchor = descriptionField;

    const builtinEmail = document.querySelector(SELECTORS.builtinEmail);
    if (builtinEmail) {
      setFieldLabel(builtinEmail, 'YOUR EMAIL ADDRESS');
      setFieldDescription(builtinEmail, 'We will use this to contact you about your report.');
      anchor = moveFieldAfter(builtinEmail, anchor) || anchor;
    }

    const builtinName = document.querySelector(SELECTORS.builtinName);
    if (builtinName) {
      setFieldLabel(builtinName, 'YOUR NAME');
      setFieldDescription(builtinName, 'We will use this to contact you about your report.');
      anchor = moveFieldAfter(builtinName, anchor) || anchor;
      const customNameField = closestField(document.querySelector(SELECTORS.customName));
      if (customNameField) hideEl(customNameField);
      return;
    }

    const customName = document.querySelector(SELECTORS.customName);
    if (customName) {
      setFieldLabel(customName, 'YOUR NAME');
      setFieldDescription(customName, 'We will use this to contact you about your report.');
      moveFieldAfter(customName, anchor);
    }
  }

  function hideAttachmentsField() {
    const form = requestForm();
    if (!form) return;
    const fileInputs = form.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => hideEl(closestField(input)));
    const attachmentLike = Array.from(form.querySelectorAll('*')).filter((node) => {
      const text = (node.textContent || '').trim();
      return /^attachments?$/i.test(text) || /drag.*drop/i.test(text) || /upload file/i.test(text);
    });
    attachmentLike.forEach((node) => hideEl(closestField(node) || node));
  }

  function decorateFields() {
    const subject = document.querySelector(SELECTORS.subject);
    if (subject) {
      setValue(SELECTORS.subject, CONSTANT_SUBJECT);
      hideEl(closestField(subject));
    }

    const stable = document.querySelector(SELECTORS.stable);
    if (stable) {
      setFieldLabel(stable, 'ITEM LINK (STABLE URL)');
      setFieldDescription(stable, 'You can copy the URL of the image. It usually looks like: https://www.jstor.org/stable/...');
      const stableParam = getUrlParameter('stable');
      const stableValue = normalizeStableUrl(stableParam);
      if (stableValue) setValue(SELECTORS.stable, stableValue);
    }

    const description = document.querySelector(SELECTORS.description);
    if (description) {
      setFieldLabel(description, 'HOW CAN WE IMPROVE THIS DESCRIPTION?*');
      description.placeholder = 'Describe what\'s incorrect, missing, or misleading.';
    }

    configureBuiltinRequesterFields();
    hideAttachmentsField();
  }

  function hideFormSelectorAndGenericCopy() {
    const legacySelect = document.getElementById('request_issue_type_select');
    if (legacySelect) hideEl(closestField(legacySelect));
    const genericLines = Array.from(document.querySelectorAll('.request-main *')).filter((node) => {
      const text = (node.textContent || '').trim();
      return text === 'Fields marked with an asterisk (*) are required.' || text === 'Submit a request';
    });
    genericLines.forEach(hideEl);
  }

  function validateIssues() {
    const checked = ISSUE_FIELD_IDS.some((fieldId) => {
      const input = document.querySelector(checkboxSelector(fieldId));
      return !!(input && input.checked);
    });
    const error = document.querySelector('.image-description-issue-error');
    if (error) error.hidden = checked;
    return checked;
  }

  function bindValidation() {
    const form = requestForm();
    if (!form || form.dataset.imageDescriptionBound === 'true') return;
    form.dataset.imageDescriptionBound = 'true';
    form.addEventListener('submit', function (event) {
      const issuesValid = validateIssues();
      if (!issuesValid) {
        event.preventDefault();
        event.stopPropagation();
        const heading = document.querySelector('.image-description-issue-heading');
        if (heading) heading.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }, true);
    form.addEventListener('change', function () {
      validateIssues();
    });
  }

  function applyDecorations() {
    const active = isTargetForm();
    document.body.classList.toggle('image-description-form-active', active);
    if (!active) return;
    ensureIntro();
    ensureIssueGroup();
    decorateFields();
    hideFormSelectorAndGenericCopy();
    bindValidation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(applyDecorations, 0);
    });
  } else {
    setTimeout(applyDecorations, 0);
  }

  const mount = requestForm() || document.querySelector('.form-container') || document.querySelector('.form');
  if (mount && window.MutationObserver) {
    const mo = new MutationObserver(function () {
      clearTimeout(mo.__t);
      mo.__t = setTimeout(applyDecorations, 75);
    });
    mo.observe(mount, { childList: true, subtree: true, attributes: true });
  }

  document.addEventListener('change', function (event) {
    const target = event.target;
    if (target && (target.id === 'request_issue_type_select' || target.name === 'request[ticket_form_id]')) {
      setTimeout(applyDecorations, 0);
    }
  });
})();
/* IMAGE_DESCRIPTION_FEEDBACK_FORM_END */

