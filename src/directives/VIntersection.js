export default {
  name: 'intersection',
  mounted(element, binding) {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    
    const callback = (entries) => {
      const { page, totalPages } = binding.instance;
      console.log(page, totalPages, binding.value);

      if (entries[0].isIntersecting && page < totalPages) {
        binding.value();
      }
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(element);
  },
}