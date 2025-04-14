package main

import "fmt"

type Cliente struct {
	Nome     string
	Idade    int
	Email    string
	Endereco Endereco
}

type Endereco struct {
	Rua    string
	Numero int
	Estado string
}

func main() {

	cliente1 := Cliente{
		Nome: "Lucas",
		Endereco: Endereco{
			Rua:    "Rua Localiza",
			Numero: 123,
			Estado: "SP",
		},
	}

	fmt.Println(cliente1)
}
