import { useState, useLayoutEffect, useRef } from 'react';

const LayoutEffectComponent = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const el = useRef();

  // we can use useEffect() also here but useEffect() will make 2 re-renders and will be behind the render because of lag in tick. whereas useLayoutEffect() will make only one re-render and smotth as well.
  // useLayoutEffect() is only useful when we have something and need to measure something that happens in the DOM but it can only be measured after it's been rendered, otherwise use useEffect()
  // in class based components, componentDidMount() works for both, so only in functional components we have to decide what to use and when.
  useLayoutEffect(() => {
    setWidth(el.current.clientWidth);
    setHeight(el.current.clientHeight);
  });

  return (
    <div>
      <h2>textarea width: {width}px</h2>
      <h2>textarea height: {height}px</h2>
      <textarea
        onClick={() => {
          setWidth(0); // this is basically saying "force update"
        }}
        ref={el}
      />
    </div>
  );
};

export default LayoutEffectComponent;
