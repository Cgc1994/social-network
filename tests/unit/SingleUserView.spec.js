import { mount } from '@vue/test-utils';
import SingleUserView from '@/views/SingleUserView.vue';

describe('SingleUserView', () => {
  it('renders user details correctly', async () => {
    const wrapper = mount(SingleUserView, {
      mocks: {
        $route: {
          params: { id: 1 },
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('User Details');
  });
});
