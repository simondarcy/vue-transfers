<template>
    <div class="row">
        <div class="col-sm-12 text-center">
        <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
            <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#42b983">
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1 1)" stroke-width="2">
                        <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                        <path d="M36 18c0-9.94-8.06-18-18-18">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 18 18"
                                to="360 18 18"
                                dur="1s"
                                repeatCount="indefinite"/>
                        </path>
                    </g>
                </g>
            </svg>
            <span class="d-block text-muted mt-3">{{ title }}</span>    
        </div>
    </div>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
     'title':{
      Type: String,
      default: 'Loading...'
    }
  },
}
</script>

<style scoped>
svg{
    width: 40%;
    height: 40%;
}
@media (min-width: 780px) {
    svg{
        width: 30%;
        height: 30%;
    }
}
</style>

