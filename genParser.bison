%{
    import {NumNode,OpNode,Node} from "@bx/ast";
%}

%lex

%%
\s+                   /* skip whitespace */
[0-9]+                return 'NUMBER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"("                   return  '('
")"                   return  ')'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'



%% /* language grammar */

expressions
    : e EOF
        {   
            Node.genGraph($1);
            return $1;
        }
    ;

e
    : e '+' e 
        {$$ = new OpNode("+",$1,$3);}
    | e '-' e
        {$$ = new OpNode("-",$1,$3);}
    | e '*' e
        {$$ = new OpNode("*",$1,$3);}
    | e '/' e
        {$$ = new OpNode("/",$1,$3);}
    | '(' e ')'
        {$$=$2;}
    | NUMBER
        {$$ = new NumNode( Number(yytext));}
    ;

