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
  checkbox.checked = true;
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
