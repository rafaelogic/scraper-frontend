import * as Api from "@/services/Api";

export default {
    async getProduct(product) {
        return await Api.handle.get(`/v1/products/${product.id}`);
    },
    async getProducts() {
        return await Api.handle.get('/v1/products');
    },
    async getProductsByPage(page) {
        return await Api.handle.get(`/v1/products?page=${page}`);
    },
    async deleteProduct(product) {
        return await Api.handle.delete(`v1/products/${product._id.$oid ?? product._id}`);
    },
    async updateProduct(product) {
        return await Api.handle.patch(`v1/products/${product.id}`, product.data);
    },
    async createProduct(payload) {
        return await Api.handle.post('v1/products', payload);
    },
    async searchProduct(keyword) {
        return await Api.handle.get(`v1/products/search?keyword=${keyword}`);
    }
}