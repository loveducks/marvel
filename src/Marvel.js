import React, { Component } from 'react';
import queryString from 'qs';
//replsace query-string to qs for build
import crypto from 'crypto';
import Character from './Character';

class Marvel extends Component{
    constructor(props){
        super(props);
        const { PRI_KEY, API_KEY, URL } = this.props;
        this.state = { param: {
            nameStartsWith: '',
            orderBy: 'name',
            limit: 20 
            },
            data: [],
            success: null 
        }
    }

    fetchAPI(){
        fetch(this.getApiUrl())
            .then( resp => resp.json())
            .then( resp => {
                const data = resp.data.results.map(fetchData)
                    this.setState({ data });
                //check if you get any valid results
                if(!this.state.data.length)
                    this.setState( {success: true} );
                else
                    this.setState( {success: false} );
            })
            .then( () => this.state.data)
            .catch( err => (
                console.log('an error occured: ' + err))
            )

    }

    getApiUrl(){
        let ts = new Date().getTime();
        let hash = crypto.createHash('md5').update( ts + this.props.PRI_KEY + this.props.API_KEY ).digest('hex');
        //adding a hash as per documentation
        let url = this.props.URL + '?' + queryString.stringify(this.state.param) + 
            '&apikey=' + this.props.API_KEY + '&ts=' + ts + '&hash=' + hash;
        console.log(url);
        return url;
    }

    getSearch(evt){
        this.setState ({param: {
            nameStartsWith: evt.target.value,
            orderBy: 'name',
            limit: 20 
            },
            success: null //will only turn null when submitting form
        });
    }

    handleSubmit(e){
        e.preventDefault();
        this.fetchAPI();
    }

    render(){
        return(
            <form className="marvel" onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" onChange={this.getSearch.bind(this)} placeholder="Search..." />
                <input type="submit" value="Go!" /> 
                {
                    //print results otherwise display error
                    (!this.state.success) ?
                    this.state.data.map( (data, idx) =>
                        <Character data={data} key={idx} />
                    ) 
                    : 
                    <p className="noresults">no results found</p>
                }
            </form>
        )
    }
}

function fetchData(data){
    return{
        bio: data.description,
        thumbnail: data.thumbnail.path + '.' + data.thumbnail.extension,
        name: data.name

    }
}

export default Marvel;