import chai from 'chai';
import {NumNode} from '../index';
let expect = chai.expect;


describe("NumNode",()=>{

    it("test1",()=>{
        var t = new NumNode(123);
        expect(t.value).to.equal(123);


    });


});