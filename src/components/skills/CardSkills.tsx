import styled from 'styled-components';
import Image from 'next/image';

interface CardStyle extends React.CSSProperties {
  '--index': number;
  '--color-card': string;
  '--quantity': number;
}

const CardSkills = () => {
  const colors = [
    '142, 249, 252',
    '142, 252, 204',
    '142, 252, 157',
    '215, 252, 142',
    '252, 252, 142',
    '252, 208, 142',
    '252, 142, 142',
    '252, 142, 239',
    '204, 142, 252',
    '142, 202, 252'
  ];

  const skills = ['HTML', 'CSS', 'Javascript', 'Typescript', 'Python', 'PHP', 'Unity', 'Cshrap', 'C' , 'SQL'];

  return (
    <StyledWrapper quantity={colors.length}>
      <div className="wrapper">
        <div className="inner">
          {colors.map((color, index) => (
            <Card
              key={index}
              index={index}
              colorCard={color}
              quantity={colors.length}
              skillName={skills[index]}
            />
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const Card = ({
  index,
  colorCard,
  quantity,
  skillName,
}: {
  index: number;
  colorCard: string;
  quantity: number;
  skillName: string;
}) => {
  const style: CardStyle = {
    '--index': index,
    '--color-card': colorCard,
    '--quantity': quantity,
  };  return (
    <div className="card hover:scale-[105%]" style={style}>
      <div className="img">
        <div className="skill-content">
          <h3 className="skill-name">{skillName}</h3>
          <div className="skill-icon">
            <Image src={`/${skillName}icon.png`} alt={skillName} width={50} height={50} />
          </div>
        </div>
      </div>
    </div>
  );
};



const StyledWrapper = styled.div<{ quantity: number }>`
  .wrapper {
    width: 100%;
    height: 100vh;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
  }

  .inner {
    --w: 150px;
    --h: 200px;
    --translateZ: calc((var(--w) + var(--h)) + 0px);
    --rotateX: -10deg;
    --perspective: 1000px;
    position: absolute;
    width: var(--w);
    height: var(--h);
    left: calc(50% - (var(--w) / 2) - 2.5px);
    z-index: 2;
    transform-style: preserve-3d;
    transform: perspective(var(--perspective));
    animation: rotating 20s linear infinite;
  }

  @keyframes rotating {
    from {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(0);
    }
    to {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(1turn);
    }
  }

  .card {
    position: absolute;
    border: 2px solid rgba(var(--color-card));
    border-radius: 12px;
    overflow: hidden;
    inset: 0;
    transform: rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(var(--translateZ));
    transition: all 0.3s ease;
  }

  .card:hover {
    border-color: rgba(var(--color-card), 1);
    box-shadow: 0 0 20px rgba(var(--color-card), 0.5);
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: #0000 radial-gradient(
      circle,
      rgba(var(--color-card), 0.2) 0%,
      rgba(var(--color-card), 0.6) 80%,
      rgba(var(--color-card), 0.9) 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .skill-content {
    text-align: center;
    color: white;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .skill-name {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    letter-spacing: 0.5px;
  }

  .skill-icon {
    font-size: 24px;
    opacity: 0.9;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card:hover::before {
    opacity: 1;
  }
`;

export default CardSkills;