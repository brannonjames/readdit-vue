import App from '../../App.vue'
import { mount } from '@vue/test-utils'
import SearchField from '@/components/SearchField.vue'
import SearchView from '@/components/SearchView.vue'

describe('SearchView', () => {
  test('Search View is hidden on mount', () => {
    const wrapper = mount(SearchView)
    expect(wrapper.isVisible()).toBe(false)
  })

  test('Entering text into search inputs renders search view', async () => {
    const appWrapper = mount(App)
    const searchViewWrapper = appWrapper.findComponent(SearchView)
    const searchFieldWrapper = appWrapper.findComponent(SearchField)
    await searchFieldWrapper.find('input').setValue('Hello World!')
    expect(searchViewWrapper.isVisible()).toBe(true)
  })
})
