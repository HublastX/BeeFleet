# Elementos sao postos aqui

## Icon

os icons vem do HeroIcon, para importalo basta seguir os exemplos que ja estao
la.
para utilizar, importe o assim

```js
import Icon from "../elements/Icon";
```

e o chame assim:

```js
<Icon name="xMark" />
```

O name é o mesmo que foi definido em Icon.js.

Para editar ele, voce pode usar o className normalmente, como por exemplo:

```js
<Icon name="xMark" className="text-bee-purple-500" />
```

Agora, caso voce queira mudar aespessura do icone, use `strokeWidth={}`, como
por exemplo:

```js
<Icon name="xMark" strokeWidth={4} />
```

para importar icones, confira o site deles ou figma e escolha o que quer usar:
https://heroicons.com/outline
https://www.figma.com/design/gKE4wCd9xk1erNW9HOg8RE/Heroicons-(Community)?node-id=1695-333&t=uBu52xZko84ClZEr-0
copie o nome dele, e cole no aray de importacao do arquivo

---

par editar ele, utilize o ClassName.
ex.:

` className="h-8 w-8 text-bee-purple-300"`

assim o tamanho dele foi definido com h e w, e a cor dele mudada com text

# btn

para facilitar a vida e nao precisar re escrever varias vezes a class do botao,
foi criado um elemento `<Btn />`.
para utilizar, basta importar o elemento:

```js
import Btn from "../elements/btn";
```

agora para utilizalo, ate entao voce pode preencher 3 campos dele:

- **texto**: texto e obrigatorio por, ele e o que vem escrito no botao

   ```js
   <Btn texto="Solicitar Carro" />
   ```

- **onClick**: para adicionar uma funcao ao botao, e possivel por com `onClick`

   ```js
   <Btn onClick={onOpenModal} />
   ```

- **className**: caso queira por um novo estilo ao botao, e possivel adicionar ele no `className` normalmente
   ```js
   <Btn className="mt-5" />
   ```
