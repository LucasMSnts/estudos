package main

import "fmt"

type Pessoa struct {
	Nome  string
	Idade int
}

func (p Pessoa) Apresentar() {
	p.Nome = "Biruleibe"
	fmt.Printf("Olá, meu nome é %s e tenho %d anos.\n", p.Nome, p.Idade)
}

func (p *Pessoa) Apresentar2() {
	p.Nome = "Biruleibe"
	fmt.Printf("Olá, meu nome é %s e tenho %d anos.\n", p.Nome, p.Idade)
}

func main() {
	p1 := Pessoa{Nome: "Lucas", Idade: 29}
	p1.Apresentar()
	fmt.Println(p1.Nome)

	p2 := Pessoa{Nome: "Lucas", Idade: 29}
	p2.Apresentar2()
	fmt.Println(p2.Nome)
}
