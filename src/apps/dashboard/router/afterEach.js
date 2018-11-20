const afterEach = (to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
}

export default afterEach
