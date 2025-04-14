package main

import "fmt"

func main() {
	var fixo = 4
	multiplica := func(x int) int {
		return x * fixo
	}

	resultado := multiplica(5)

	fmt.Println("Multiplica: ", resultado)

	soma(2, 2)
}

func soma(a, b int) {
	fmt.Println("Soma: ", a+b)
}
