const Comp_0 = () => <p>Hello!</p>;

const Comp_1 = withChange1(Comp_0);
const Comp_2 = withChange2(Comp_1);

const withChange1 = Comp => props =>
  props.isTrue ? <p>TRUE</p> : <Comp {...props} />;

const withChange2 = Comp => props =>
  props.isTrue ? <Comp {...props} /> : <p>FALSE</p>;

const App = () => <Comp_2 isTrue={1} />;

export default App;
