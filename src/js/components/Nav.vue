<script>
  export default {
    name: 'Nav'
  }
</script>

<template>
  <div class="nav-wrapper">
    <div class="row">
      <div class="col s12">
        <nav>
          <div class="nav-wrapper white black-text ">
            <a class="brand-logo cyan-text hide-on-med-and-down">
              <img src="assets/icons/idea.svg" title="logo">
            </a>
            <ul class="right">
              <li><a class="menuitem modal-trigger" href="#status"><i class="material-icons teal-text text-lighten-1">subject</i></a></li>
              <li><a class="menuitem"><i class="material-icons blue-grey-text">refresh</i></a></li>
              <li><a class="menuitem"><i class="material-icons red-text">close</i></a></li>
              <li class="github-button"><a href="https://github.com/fabiandev/vue-twitter-stream" target="_blank" class="waves-effect waves-light btn"><i class="material-icons left">code</i>GitHub</a></li>
            </ul>
            <div class="progress">
              <div class="determinate" style="width:0%"></div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<style>
  .progress {
    position: absolute;
    border-radius: 0;
    margin: 0;
    background-color: transparent;
    bottom: 0;
  }

  .nav-wrapper {
    margin-bottom: 3rem;
  }

  .menuitem {
    cursor: pointer;
  }

  ul li .btn i {
    font-size: 1.3rem;
    line-height: 36px;
  }

  ul li a.menuitem:hover {
    background-color: rgba(236, 239, 241, 1);
  }

  ul li a.btn {
    padding: 0 1.8rem 0 1.3rem;
  }

  .brand-logo {
    height: 100%;
  }

  a.brand-logo {
    cursor: default;
  }

  .brand-logo img {
    cursor: default;
    height: 1.3em;
    margin-left: 10px;
    display: block;
    position: absolute;
    top: 50%;
    /* put further to top than center */
    margin-top: -0.7em;
  }

  @media only screen and (max-width: 369px) {
    .github-button {
      display: none;
    }
  }
</style>
