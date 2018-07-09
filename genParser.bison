%{
%}

%lex

%%


\s+                   /* skip whitespace */
//keywords
"function"            return 'FUNCTION'
"return"              return 'RETURN'

//
[0-9]+                return 'NUMBER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"("                   return  '('
")"                   return  ')'
";"                   return  ';'
"if"                  return "IF"
"else"                return "ELSE"
">"                   return '>'
"<"                   return '<'
[a-zA-Z_][a-zA-Z_0-9]*  return 'NAME'
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
%right 'RETURN'



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
    | function_declare_statement   {}
    | '{' inner_statement_list '}'    {}
    | if_else_statement  {}
 //   | function_statement    {} 
    ;


if_else_statement
    :IF '(' expr ')' compound_statement ELSE compound_statement {}
    ;






function_declare_statement
    : FUNCTION NAME '(' parameter_list  ')' compound_statement
    ;
/*
function_statement   
    : NAME '(' parameter_list  ')'
    ;
*/
parameter_list
    :    {}
    |  parameter   {}
    |  parameter_list ',' parameter  {}
    ;

parameter
    :VARIABLE   {}
    ;

compound_statement
    : '{' inner_statement_list '}'   {}
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
    | NAME '(' parameter_list  ')' 
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
    | RETURN expr
        {}
    | NUMBER
        {}
    | VARIABLE
        {}
    ;


