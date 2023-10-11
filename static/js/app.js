const url= "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
});

function init() {
    d3.json(url).then(function(data) {
        console.log(data);
        var dropdownbox= d3.select("#selDataset")
        for (var i=0;i<data.names.length;i++){
            dropdownbox.append("option").text(data.names[i]).property("value",data.names[i])
        }
        buildcharts(data.names[0])
        buildmetadata(data.names[0])
    });
}
function buildcharts(sample_id){
    d3.json(url).then(function(data) {
        var samples= data.samples
        var sample= samples.filter(element=>element.id== sample_id)[0]
        console.log(sample)

        //space to make charts
        let tracebar= {
            x: sample.sample_values.slice(0,10).reverse(),
            y: sample.otu_ids.slice(0,10).map(otu_id=>"OTU "+ otu_id).reverse(),
            text: sample.otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation:"h"
        }
        Plotly.newPlot("bar",[tracebar],[])
        

    });
}
function buildmetadata(sample_id){
    d3.json(url).then(function(data) {
        var meta_data_list= data.metadata
        var metadata= meta_data_list.filter(element=>element.id== sample_id)[0]
        console.log(metadata)

        //demographic info 4 and 5
    });
} 
function optionChanged(new_sample){
    buildcharts(new_sample)
    buildmetadata(new_sample)
}
init()
