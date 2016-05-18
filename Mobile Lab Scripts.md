## Mobile Lab Scripts

#### 5.1 – List Configurations

##### Table Titles
```javascript
var title = current.short_description;
var extras = [];

if (current.caller_id.vip) {
    extras.push('Important caller!');
}
if (current.assigned_to.vip) {
    extras.push('Important assignee!');
}

titleValues.setTitle(title);
titleValues.setExtras(extras);
```

#### 8.1 – Client Scripts

##### Broken Client Script
```javascript
function onSubmit() {

  // we did some validation?
  if (isValidated) {
    console.log('Form checks out!');
  }
  return true;
}
```

##### Asynchronous Client Script
```javascript
function onSubmit() {

  // store a custom value to determine
  // if we passed validation
  if (g_form.isCustomValidated === true) {
    console.log('Custom validation for the form passed!');
    return true;
  }
  var gr = new GlideRecord('incident');
  gr.addQuery('active', true);

  // save the action name
  var actionName = g_form.getActionName();
  gr.query(function() {
    console.log('GlideRecord rows: ' + gr.getRowCount());

    // we have GlideRecord results here
    // but we'll resubmit with our
    // custom validation flag set
    g_form.isCustomValidated = true;

    // resubmit with the previous action name
    g_form.submit(actionName);
  });
  console.log('Halting submit -- loading data...');
  return false;
}
```

#### 9.1 – UI Actions

##### List UI Action
```javascript
current.setValue('state', 2);
current.update();
```

##### Redirecting UI Action
```javascript
var gr = new GlideRecord('incident');
gr.addQuery('category', 'hardware');

// create a desktop URL
var url = 'incident_list.do?sysparm_query=';
url += gr.getEncodedQuery();
action.setRedirectURL(url);
```