


const Review =()=>{



    const getReviews = async()=>{
        const response=await axios.get(`${BASE_URL}/reviews/`)
        setReviews(response.data)
        console.log(response.data)
       }
          
       useEffect(()=>{
        classes()
        getReviews()
      
      
       },[])  

       const handleDeleteClick = async (e,id) => {
        await Client.delete(`${BASE_URL}/reviews/${id}`,{
          classId:id
        });
      navigate(`/classes`)
      };
      
    
      
      const handleUpdateClick = () => {
        navigate(`/classes`);
      };

    return(
        <div>

        </div>
    )
}

export default Review