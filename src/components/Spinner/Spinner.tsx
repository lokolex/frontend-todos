import spinnerSvg from './spinner.svg';

interface ISpinnerProps
  extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  width: number;
  height: number;
}

const Spinner = ({ width, height }: ISpinnerProps): JSX.Element => {
  return (
    <img style={{ width: `${width}px`, height: `${height}px` }} src={spinnerSvg} alt="spinner" />
  );
};

export default Spinner;
