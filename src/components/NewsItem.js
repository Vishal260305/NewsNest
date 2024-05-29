import React from 'react'

const NewsItem = (props) => {
   
    
        let {title,description,imageUrl,newsUrl,author,date} = props;
        return (
            <div className="my-3">
                <div className="card" style={{width: "18rem"}}>
                    <img src={!imageUrl?"https://th.bing.com/th/id/OIP.F4eiZn0Wjgp4EFtocph2BAAAAA?rs=1&pid=ImgDetMain" : imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className='text-muted'>By {!author? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                        </div>
                </div>
            </div>
        )
    
}

export default NewsItem
