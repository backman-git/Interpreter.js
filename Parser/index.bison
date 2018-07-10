%{
    //import {Node,OpNode,NumNode,VarNode,AssignNode} from '@bx/ast';
%}

%lex

%%


\s+                   /* skip whitespace */
//keywords
"function"            return 'FUNCTION'
"return"              return 'RETURN'
"if"                  return "IF"
"else"                return "ELSE"

//
[0-9]+                return 'NUMBER'
\$[a-zA-Z_][a-zA-Z_0-9]*     return 'VARIABLE'
[a-zA-Z_][a-zA-Z_0-9]*  return 'NAME'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"("                   return  '('
")"                   return  ')'
";"                   return  ';'
">"                   return '>'
"<"                   return '<'
"="                   return '='
"{"                   return '{'
"}"                   return '}'
","                   return ','






<<EOF>>               return 'EOF'
.                     return 'INVALID'


/lex

/* operator associations and precedence */
%left '=' 'RETURN'
%left '>' '<'
%left '+' '-'
%left '*' '/'



%% /* language grammar */


start
    :top_statement_list EOF   
    {
        Node.genGraph($1); 
        Parser.prototype.AST = $1;
        Parser.prototype.getAST =function(){
           return this.AST;
        };

        $$=$1;

    }
    ;


top_statement_list
    :top_statement_list top_statement   
        {

            ($1).addStmt($2);
            $$ = $1;
        }
    | top_statement                     {$$ = new ProgramNode($1);   }
    ;


top_statement
    :statement                        { $$=$1; }
    ;



statement
    : expr ';'     { $$ = new StmtNode($1);    }
    | function_statement   {$$=new StmtNode($1);}
    | '{' inner_statement_list '}'    {$$ = new StmtNode($2);}
    | if_else_statement  {$$ = new StmtNode($1);}
 //   | function_statement    {} 
    ;

if_else_statement
    :IF '(' expr ')' compound_statement ELSE compound_statement 
        {$$ = new IfElseNode($3,new SepExpNode($5,$7) );}
    ;

function_statement
    : FUNCTION NAME '(' parameter_list  ')' compound_statement
        {$$ = new FunctNode($2,$4,$6);}
    ;



parameter_list
    :  parameter   {$$= new ParaListNode($1);}
    |  parameter_list ',' parameter 
        {
            $1.addPara($3);
            $$=$1;
        }
    ;

parameter
    :VARIABLE   {$$ = new PNode($1);}
    | {$$ = new PNode(null);}
    ;

argument_list
    : argument  {$$ = new ArgListNode($1);}
    | argument_list ',' argument  
        {
            $1.addArg($3);
            $$=$1;
        }
    ;

argument 
    :expr  {$$= new ArgNode($1);}
    |   {$$ = new ArgNode(null);}
    ;


compound_statement
    : '{' inner_statement_list '}'   {$$=$2;}
    ;



inner_statement_list
    : inner_statement_list inner_statement  
        {  
            ($1).addStmt($2);
            $$ = $1;
        }
    | inner_statement  {$$= new CompoundStmtNode($1);}
    ;

inner_statement
    : statement   {$$=$1;}
    ;



expr
    : VARIABLE '=' expr  
        {$$ = new AssignNode(new VarNode($1),$3); } 
    | NAME '(' argument_list  ')' 
        {$$ = new FunctExpNode($1,$3);}
    | expr '+' expr
        {$$ = new OpNode('+',$1,$3); }
    | expr '-' expr
        {$$ = new OpNode('-',$1,$3); }
    | expr '*' expr
        {$$ = new OpNode('*',$1,$3); }
    | expr '/' expr
        {$$ = new OpNode('/',$1,$3); }
    | expr '>' expr
        {$$ = new OpNode('>',$1,$3); }
    | expr '<' expr
        {$$ = new OpNode('<',$1,$3); }
    | '(' expr ')'
        {$$=$2}
    | RETURN expr
        {$$ = new ReturnNode($2);}
    | NUMBER
        {$$ = new NumNode(Number(yytext));}
    |VARIABLE
        {$$ = new VarNode(yytext);}
    ;


