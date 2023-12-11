import { mount } from '@vue/test-utils';
import App from '@/App.vue';

describe('Integration Test', () => {
  it('renders SingleUserView after navigating from ListUsersView', async () => {
    const wrapper = mount(App);

    await wrapper.findComponent({ name: 'ListUsersView' }).vm.$emit('navigateToUser', 1);
    
    expect(wrapper.text()).toContain('Single User View');
  });

  it('renders AlbumPhotosView after navigating from SingleUserView', async () => {
    const wrapper = mount(App);

    await wrapper.findComponent({ name: 'SingleUserView' }).vm.$emit('viewAlbum', { id: 1, title: 'Sample Album' });
    
    expect(wrapper.text()).toContain('Album Photos View');
  });
});
