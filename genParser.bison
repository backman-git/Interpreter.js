%{
    //import {Node,OpNode,NumNode,VarNode,AssignNode} from '@bx/ast';
%}

%lex

%%
\s+                   /* skip whitespace */
[0-9]+                return 'NUMBER'
\$[a-zA-Z_][a-zA-Z_0-9]*     return 'VARIABLE'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"("                   return  '('
")"                   return  ')'
";"                   return  ';'
"if"                  return "IF"
">"                   return '>'
"<"                   return '<'
"="                   return '='
"{"                   return '{'
"}"                   return '}'


<<EOF>>               return 'EOF'
.                     return 'INVALID'


/lex

/* operator associations and precedence */
%left '='
%left '>' '<'
%left '+' '-'
%left '*' '/'



%% /* language grammar */


start
    :top_statement_list EOF   
    {
        Node.genGraph($1); 
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
    | '{' inner_statement_list '}'    {}
    ;

inner_statement_list
    : inner_statement_list inner_statement  {}
    |
    ;

inner_statement
    : statement   {$$=$1;}
    ;



expr
    : VARIABLE '=' expr  
        {$$ = new AssignNode(new VarNode($1),$3); } 
    | expr '+' expr
        {$$ = new OpNode('+',$1,$3); }
    | expr '-' expr
        {$$ = new OpNode('-',$1,$3); }
    | expr '*' expr
        {$$ = new OpNode('*',$1,$3); }
    | expr '/' expr
        {$$ = new OpNode('/',$1,$3); }
    | expr '>' expr
        {}
    | expr '<' expr
        {}
    | '(' expr ')'
        {$$=$2}
    | NUMBER
        {$$ = new NumNode(Number(yytext));}
    |VARIABLE
        {$$ = new VarNode(yytext);}
    ;


