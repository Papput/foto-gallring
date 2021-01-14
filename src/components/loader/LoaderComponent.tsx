import PulseLoader from "react-spinners/PulseLoader";

const LoaderComponent = () => {
    return (
        <PulseLoader color={'#00BFFF'} loading={true} size={25} css={`
            position: absolute;
            top: 10%;
            right: 10%;
        `} />
    )
}

export default LoaderComponent
