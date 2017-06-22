import ItemList from './list.vue'


// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export default function createListView (type) {
  return {
    name: `${type}-topic-view`,

    asyncData ({ store }) {
      let page = store.state.route.params.page || 1
      return store.dispatch('FETCH_LIST_DATA', { type, page })
    },

    render (h) {
      return h(ItemList, { props: { type }})
    }
  }
}
