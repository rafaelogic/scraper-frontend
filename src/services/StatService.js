import * as Api from "@/services/Api";

export default {
    async getQuantitiesStats() {
        return await Api.handle.get('v1/stats/high-quantities');
    }
}