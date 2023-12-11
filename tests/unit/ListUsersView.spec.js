import { mount, createLocalVue } from '@vue/test-utils';
import ListUsersView from '@/views/ListUsersView.vue';

const localVue = createLocalVue();

describe('ListUsersView', () => {
  it('renders users', async () => {
    const wrapper = mount(ListUsersView, {
      localVue,
      data() {
        return {
          users: [
            { id: 1, name: 'User 1' },
            { id: 2, name: 'User 2' },
          ],
          loaded: true,
          recentlyVisitedAlbums: [],
        };
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('User 1');
    expect(wrapper.text()).toContain('User 2');
  });

  it('navigates to user on click', async () => {
    const $router = {
      push: jest.fn(),
    };

    const wrapper = mount(ListUsersView, {
      localVue,
      mocks: {
        $router,
      },
      data() {
        return {
          users: [
            { id: 1, name: 'User 1' },
          ],
          loaded: true,
          recentlyVisitedAlbums: [],
        };
      },
    });

    await wrapper.vm.$nextTick();

    await wrapper.find('.user-link').trigger('click');

    expect($router.push).toHaveBeenCalledWith({ name: 'single-user', params: { id: 1 } });
  });
});