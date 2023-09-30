const Spinner = ({ isLoading }) => {
  return (
    <div className={`spinner${isLoading ? ' active' : ''}`}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Spinner
