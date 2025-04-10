
const NotFoundPage = () => {
  return (
    <section>
      <div   style={{
        position: "absolute", 
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: "url(https://cdn.pixabay.com/photo/2016/11/23/14/45/coding-1853305_1280.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.3, 
      zIndex: "-1", 
    }}>
        
          
      </div>
      <div className="pt-20 text-center text-5xl font-bold">
        <p className="text-blue-900 mb-20">404</p>
        <p className="mb-20">Oooops...Something went wrong Page not found!</p>
        <p>Page not found!</p>
        
      </div>
    </section>
  )
}

export default NotFoundPage
