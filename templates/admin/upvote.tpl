<h1>Upvotes</h1>

<hr>

<form class="upvote-form">
  <p>Configure the POST request options for when a post is upvoted</p>
  <fieldset>
    <div class="row">
      <div class="col-sm-12">
        <div class="form-group">
          <label for="apiUrl">UPVOTE POST URL</label>
          <input type="text" id="upvote:apiUrl" data-field="upvote:apiUrl" title="UPVOTE API URL" class="form-control" placeholder="UPVOTE API URL">
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <label for="apiUrl">DOWNVOTE POST URL</label>
          <input type="text" id="downvote:apiUrl" data-field="downvote:apiUrl" title="DOWNVOTE API URL" class="form-control" placeholder="DOWNVOTE API URL">
        </div>
      </div>
       <div class="col-sm-12">
        <div class="form-group">
          <label for="apiUrl">UNVOTE POST URL</label>
          <input type="text" id="unvote:apiUrl" data-field="unvote:apiUrl" title="UNVOTE API URL" class="form-control" placeholder="UNVOTE API URL">
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <label for="headerField">Header Field (Ex. <code>X-Auth-Token</code>)</label>
          <input type="text" id="upvote:headerField" data-field="upvote:headerField" title="Header Field" class="form-control" placeholder="Header Field">
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <label for="apiToken">API Token (The value to be sent in <code>Header Field</code>)</label>
          <input type="text" id="upvote:apiToken" data-field="upvote:apiToken" title="API Token" class="form-control" placeholder="API Token">
        </div>
      </div>
    </div>

  </fieldset>

  <p>Configure the Redis publish options for when a post is upvoted</p>
  <fieldset>
    <div class="row">
      <div class="col-sm-12">
        <div class="form-group">
          <label for="upvote:redisHost">Redis Host</label>
          <input type="text" id="upvote:redisHost" data-field="upvote:redisHost" title="Redis Host" class="form-control" placeholder="Host of your redis instance">
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <label for="upvote:redisPort">Redis Port</label>
          <input type="text" id="upvote:redisPort" data-field="upvote:redisPort" title="Redis Port" class="form-control" placeholder="Port of your redis instance">
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <label for="upvote:redisPassword">Redis Password</label>
          <input type="text" id="upvote:redisPassword" data-field="upvote:redisPassword" title="Redis Password" class="form-control" placeholder="Password of your redis instance" autocomplete="off">
        </div>
      </div>
    </div>
  </fieldset>

  <button class="btn btn-lg btn-primary" id="save">Save</button>
</form>


<script>
  require(['admin/settings'], function(Settings) {
    Settings.prepare()
  })
</script>
