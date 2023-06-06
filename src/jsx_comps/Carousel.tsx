import { Component, MouseEvent } from 'react';

interface IProps{
    images: string[]
}

class Carousel extends Component<IProps>{
    state = {
        active: 0
    }

    static defaultProps = {
        images : ["https://pets-images.dev-apis.com/pets/none.jpg"]
    }

    // method-1
    // handleState = (id) =>{
    //     console.log(id);
    //     this.setState({active:id});
    // }

    // method-2
    handleIndexClick = (e: MouseEvent<HTMLElement>) =>{
        if(!(e.target instanceof HTMLElement)){
            return;
        }

        if(e.target.dataset.index){
            this.setState({
                // dataset refers to all "data-" on an object
                active: +e.target.dataset.index // this "+" before e is called "uninary plus" which converts string values to num value.
            })
        }  
    }

    render(){
        const { active } = this.state;
        const { images } = this.props;
        return(
            <div className='carousel'>
                <img src={images[active]} alt="animal hero" />
                <div className='carousel-smaller'>
                    {images.map((photo,index)=>{
                        // method-1
                        // return <img key={photo} src={photo} alt="animal thumbnail" className={index===active ? "active" : ""} onClick={()=>this.handleState(index)}/>

                        // method-2
                        // this "data-index" is a browser DOM method. Everything that comes out of DOM is a string. that's why index is a string even though it was a number. 
                        // eslint-disable-next-line
                        return <img key={photo} data-index={index} src={photo} alt="animal thumbnail" className={index===active ? "active" : ""} onClick={this.handleIndexClick}/>
                    })}
                </div>
            </div>
        )
    }
}

export default Carousel;