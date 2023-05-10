<template>
    <div class="z-50 modal-backdrop">
      <div class="w-1/2 px-4 pb-6 mx-auto text-gray-600 rounded-lg mx-w-4xl bg-gradient-to-br from-green-50 to-cyan-100">
        <header class="relative flex items-center justify-between w-full pt-4 pb-2 border-b-1">
          <h2 class="text-2xl font-semibold">
            <slot name="header"></slot>
          </h2>

          <button
            type="button"
            class="p-2 font-bold text-red-400 hover:bg-green-100"
            @click.stop="close"
          >
            x
          </button>
        </header>
  
        <section class="modal-body">
          <slot name="body">
          </slot>
         </section>
  
        <footer class="modal-footer">
          <slot name="footer">
          </slot>
        </footer>
      </div>
    </div>
  </template>
<script>
  export default {
    name: 'AppModal',
    methods: {
      close() {
        this.$emit('close');
        // window.location.reload();
      },
    },
  };
</script>
<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    display: flex;
    flex-direction: column;
  }
</style>