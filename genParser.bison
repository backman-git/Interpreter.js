%{
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
";"                   return  ';'
"if"                  return "IF"
">"                   return '>'
"<"                   return '<'
\$[a-zA-Z_][a-zA-Z_0-9]*     return 'VARIABLE'
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
    :top_statement_list EOF   { }
    ;


top_statement_list
    :top_statement_list top_statement   { }
    |
    ;


top_statement
    :statement                        {    }
    ;


statement
    : expr ';'          {}
    | '{' inner_statement_list '}'    {}
    ;

inner_statement_list
    : inner_statement_list inner_statement  {}
    |
    ;

inner_statement
    : statement   {}
    ;


expr
    : VARIABLE '=' expr  
        {} 
    | IF '(' expr ')' statement    
        {}
    | expr '+' expr
        {}
    | expr '-' expr
        {}
    | expr '*' expr
        {}
    | expr '/' expr
        {}
    | expr '>' expr
        {}
    | expr '<' expr
        {}
    | '(' expr ')'
        {}
    | NUMBER
        {}
    | VARIABLE
        {}
    ;


