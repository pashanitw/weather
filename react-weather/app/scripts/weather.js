var React=require('React'),
    mountNode=document.getElementById('result');
var Loader = require('react-loader');
var options = {
    lines: 13,
    length: 20,
    width: 10,
    radius: 30,
    corners: 1,
    rotate: 0,
    direction: 1,
    color: '#000',
    speed: 1,
    trail: 60,
    shadow: false,
    hwaccel: false,
    zIndex: 2e9,
    top: '50%'
};

var Canvas=React.createClass(
    {
        render:function(){
            return(
                <div>
                    <span>{this.props.data.city}</span>
                    <span>{this.props.data.country}</span>
                    <span>{this.props.data.latitude}</span>
                    <span>{this.props.data.longitude}</span>
                </div>
            )
        }
    }
);
var Component=React.createClass(
    {
        getInitialState: function () {
            return {
                data: {
                    city: '...',
                    country: '...',
                    latitude: '...',
                    longitude: '...'
                }
            }
        },
        componentDidMount:function(){
            var component=this;
            getGeoData().geoLocation().then(function(result){
                component.setState({data:result});
            })
        },
        render:function(){
            return(
                <div>
                    <Canvas data={this.state.data}/>
                    <Loader loaded={false} options={options} className="spinner" />
                </div>
            )
        }
    }
);

function JSON_CALLBACK(){
    // Nothing
}

function getGeoData(){

    return {
        geoLocation:function(){
            var deferred=new $.Deferred();
            var url="http://muslimsalat.com/daily.json?callback=JSON_CALLBACK";
            $.when($.ajax({
                url: url,
                dataType: 'jsonp'
            })).done(function(data){
                deferred.resolve(data);
            });
            return deferred.promise();
        },
        getWeeklyWeather:function(){

        }
    }
}

React.render(<Component/>,mountNode);

