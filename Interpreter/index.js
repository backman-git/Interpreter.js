class Visitor{

    constructor(){

    }

    visitNumNode(node){}
    visitOpNode(node){}
    visitVarNode(node){}
    visitAssignNode(node){}
    visitStmtNode(node){}
    visitProgramNode(node){}

}

var dfs = (root,visitor)=>{
    if(root == null)
        return;
    dfs(root.left,visitor);
    return root.accept(visitor);
};


class Interpreter extends Visitor{

        
    constructor(tree){
        super();
        this.globalSymbolTlb={};
        this.globalFuntTlb={};
        this.tree=tree;
    }

    run(){
        if (this.tree !=null)
            this.tree.accept(this);
    }

    interpret(tree){
        
        tree.accept(this);
        if(this.tree == null)
            this.tree =tree;
        else
            this.tree.concat(tree);
    }


    visitProgramNode(node){
        dfs(node.left,this);
    }
//There are many way tp design this function. 這裡有很多地方可以設計

    visitFunctNode(node){
        this.globalFuntTlb[node.value]=node;
    }

    visitFunctExpNode(node){
        
        var funtNode=this.globalFuntTlb[node.value];

        var argValueAry = node.left.accept(this);
        var paraSymboAry = funtNode.left.accept(this);
        var localSymbolTlb={};

        for( var idx =0;idx<paraSymboAry.length;idx++ )
            localSymbolTlb[paraSymboAry[idx]] = argValueAry[idx];

        var tmpStoreTlb=Object.assign({},this.globalSymbolTlb);
        this.globalSymbolTlb = Object.assign(this.globalSymbolTlb,localSymbolTlb); 
        var res=funtNode.right.accept(this);

        //should change!!! This is bypass!

        //delete arguments
        for( var k in localSymbolTlb)
            delete this.globalSymbolTlb[k];
        //update global value
        for( var k in this.tmpStoreTlb)
            tmpStoreTlb[k]=this.globalSymbolTlb[k];
        //restore
        this.globalSymbolTlb = Object.assign({},tmpStoreTlb);
        return res;
    }
    visitArgListNode(node){
        var argList = [];
        for(var n = node.left ;n!=null; n=n.left)
           argList.push(n.accept(this));
        return argList;
    }

    visitArgNode(node){return node.right.accept(this);}

    visitParaListNode(node){
        var paraList = [];
        for(var n = node.left ;n!=null; n=n.left)
            paraList.push(n.accept(this));
        return paraList;
    }
    visitPNode(node){return node.token;}


    visitIfElseNode(node){
        node.right.accept(this,node.left.accept(this));
    }

    visitSepExpNode(node,truthValue){
        if (truthValue> 0)
            node.left.accept(this);
        else
            node.right.accept(this);

    }


    visitOpNode(node){
        var res=0;
        switch(node.token){

            case '+':
                res= node.left.accept(this) + node.right.accept(this);
                break;
            case '-':
                res= node.left.accept(this) - node.right.accept(this);
                break;
            case '*':
                res= node.left.accept(this) * node.right.accept(this);
                break;
            case '/':
                res= node.left.accept(this) / node.right.accept(this);
                break;
            case '>':
                res= node.left.accept(this) - node.right.accept(this);
                break;
            case '<':
                res= -1* node.left.accept(this) + node.right.accept(this);
                break;
        }
        return res;
    }

    visitAssignNode(node){
        // separate the one statement into two because we will change the globalsymboltlb
        var value= node.right.accept(this);
        this.globalSymbolTlb[node.left.token] = value;
        return null;
    }

    visitVarNode(node){
            return this.globalSymbolTlb[node.token];

    }


    visitStmtNode(node){
        if(node.right != null){
            return node.right.accept(this);
        }
    }

    visitCompoundStmtNode(node){
        return dfs(node.right,this);
    }

    visitReturnNode(node){
        return node.right.accept(this);
    }


    visitNumNode(node){
        return node.value;
    }

    



}

export{Interpreter};