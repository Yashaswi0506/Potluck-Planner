export const Home = () => {
  return (
    <div>
      <Title />
      <Subtitle />
    
    </div>
  );
};

export function Title() {
  return(<h1>Potluck Planner</h1>);
}

export function Subtitle() {
  return(<h3>Where food brings everyone together</h3>);
}
