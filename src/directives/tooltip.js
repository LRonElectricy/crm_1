export default {
  bind(el, {value}){
    M.Tooltip.init(el, {html: value, position: 'top'});
  },
  unbind(el){
    var instance = M.Tooltip.getInstance(el);
    instance.destroy();
  }
}
