import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as cytoscape from 'cytoscape';
import * as _ from 'lodash';
import * as YAML from 'js-yaml';

@Component({
  selector: 'projectory-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  project = {name: 'loading...'};

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    console.log('lodash loaded' + _.VERSION);
    // console.log(Cytoscape);
    console.log('container', document.getElementById('cy'));
    console.log('yaml', YAML);
    this.http.get('assets/projects/project.yaml', {responseType: 'text'}).subscribe(data => {
      // console.log('data', data);
      // console.log('parse to json', YAML.load(data));
      let jsondata = YAML.load(data);
      this.project = jsondata.project;
      let cy = cytoscape({

        container: document.getElementById('cy'), // container to render in

        // elements: [ // list of graph elements to start with
        //   { // node a
        //     data: { id: 'a' }
        //   },
        //   { // node b
        //     data: { id: 'b' }
        //   },
        //   { // edge ab
        //     data: { id: 'ab', source: 'a', target: 'b' }
        //   }
        // ],
        elements: jsondata.project.elements,

        style: [ // the stylesheet for the graph
          {
            selector: 'node',
            style: {
              // 'background-color': '#666',
              'background-color': function (ele) {
                return ele.data('bg') || '#666';
              },
              'label': 'data(id)'
            }
          },

          {
            selector: 'edge',
            style: {
              'width': 3,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle'
            }
          }
        ],

        layout: {
          // name: 'grid',
          // rows: 1
          name: 'cose'
        }

      });
    });
    // .toPromise().then(res => {
    // console.log('file read', res);
    // }, err=>{
    //   console.error('file reading failed', err);
    // });
  }
}
