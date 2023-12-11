import { mount } from '@vue/test-utils';
import AlbumPhotosView from '@/views/AlbumPhotosView.vue';

describe('AlbumPhotosView', () => {
  it('renders album photos correctly', async () => {
    const mockLocalStorage = {
      recentlyVisitedAlbums: JSON.stringify([{ id: 1, title: 'Sample Album' }]),
    };
    const wrapper = mount(AlbumPhotosView, {
      props: {
        id: '1',
      },
      global: {
        mocks: {
          localStorage: mockLocalStorage,
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Sample Album');
  });
});
