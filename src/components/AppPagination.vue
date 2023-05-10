<template>
    <div class="flex justify-center w-full">
          <ul class="flex items-center p-2 bg-gradient-to-br from-green-50 to-cyan-100 rounded-xl">
              <li class="pagination-item">
                  <span
                      class="h-10 px-3 py-2 text-gray-600 no-underline border border-gray-100 rounded-sm rounded-l cursor-not-allowed"
                      v-if="isInFirstPage"
                  >&laquo;</span>
                  <a
                      v-else
                      @click.prevent="onClickFirstPage"
                      class="px-3 py-2 text-gray-600 no-underline border-t border-b border-l border-gray-100 rounded-sm rounded-l hover:bg-gray-100"
                      href="#"
                      role="button"
                      rel="prev"
                  >
                      &laquo;
                  </a>
              </li>
  
              <li class="pagination-item">
                  <button
                      type="button"
                      @click="onClickPreviousPage"
                      :disabled="isInFirstPage"
                      aria-label="Go to previous page"
                      class="px-3 py-2 mx-2 text-sm text-gray-600 no-underline border border-gray-100 rounded-sm hover:bg-gray-100"
                      :class="{'cursor-not-allowed': isInFirstPage}"
                  >Previous</button>
              </li>
  
              <li
                  v-for="page in pages"
                  class="pagination-item"
                  :key="page.name"
              >
                  <span
                      class="px-3 py-2 mx-2 text-blue-500 no-underline bg-blue-100 border border-blue-100 rounded-sm cursor-not-allowed"
                      v-if="isPageActive(page.name)"
                  >{{ page.name }}</span>
                  <a
                      class="px-3 py-2 mx-2 text-gray-600 no-underline border border-gray-100 rounded-sm hover:bg-gray-100"
                      href="#"
                      v-else
                      @click.prevent="onClickPage(page.name)"
                      role="button"
                  >{{ page.name }}</a>
              </li>
  
              <li class="pagination-item">
                  <button
                      type="button"
                      @click="onClickNextPage"
                      :disabled="isInLastPage"
                      aria-label="Go to next page"
                      class="px-3 py-2 mx-2 text-sm text-gray-600 no-underline border border-gray-100 rounded-sm hover:bg-gray-100"
                      :class="{'cursor-not-allowed': isInLastPage}"
                  >Next</button>
              </li>
  
              <li class="pagination-item">
                  <a
                      class="px-3 py-2 text-gray-600 no-underline border border-gray-100 rounded-sm rounded-r hover:bg-gray-100"
                      href="#"
                      @click.prevent="onClickLastPage"
                      rel="next"
                      role="button"
                      v-if="hasMorePages"
                  >&raquo;</a>
                  <span
                      class="px-3 py-2 text-gray-600 no-underline border border-gray-100 rounded-sm rounded-r cursor-not-allowed hover:bg-gray-100"
                      v-else
                  >&raquo;</span>
              </li>
          </ul>
      </div>
</template>

<script>
export default {
    name: "AppPagination",
    props: {
      maxVisibleButtons: {
        type: Number,
        required: false,
        default: 3
      },
  
      totalPages: {
        type: Number,
        required: true
      },
  
      total: {
        type: Number,
        required: true
      },
  
      perPage: {
        type: Number,
        required: true
      },
  
      currentPage: {
        type: Number,
        required: true
      },
  
      hasMorePages: {
        type: Boolean,
        required: true
      }
    },
  
    computed: {
      startPage() {
        if (this.currentPage === 1) {
          return 1;
        }
  
        if (this.currentPage === this.totalPages) {
          return this.totalPages - this.maxVisibleButtons + 1;
        }
  
        return this.currentPage - 1;
      },
      endPage() {
        return Math.min(
          this.startPage + this.maxVisibleButtons - 1,
          this.totalPages
        );
      },
      pages() {
        const range = [];
  
        for (let i = this.startPage; i <= this.endPage; i += 1) {
          range.push({
            name: i,
            isDisabled: i === this.currentPage
          });
        }
  
        return range;
      },
      isInFirstPage() {
        return this.currentPage === 1;
      },
      isInLastPage() {
        return this.currentPage === this.totalPages;
      }
    },
  
    methods: {
      onClickFirstPage() {
        this.$emit("pagechanged", 1);
      },
      onClickPreviousPage() {
        this.$emit("pagechanged", this.currentPage - 1);
      },
      onClickPage(page) {
        this.$emit("pagechanged", page);
      },
      onClickNextPage() {
        this.$emit("pagechanged", this.currentPage + 1);
      },
      onClickLastPage() {
        this.$emit("pagechanged", this.totalPages);
      },
      isPageActive(page) {
        return this.currentPage === page;
      }
    }
  };
</script>
<!-- data: {
    page: 1,
    totalPages: 4,
    total: 40,
    perPage: 10,
    currentPage: 1,
    hasMorePages: true
  },
  methods: {
    showMore(page) {
      this.page = page;
      this.currentPage = page;
    }
  } -->