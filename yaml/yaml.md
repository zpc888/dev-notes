# Data type supported by YAML

1. String
2. number
3. boolean
4. sequence -- array or list
5. Set
6. Map
7. binary
8. timestamp

```yaml
---
# person yaml
firstName: George
lastName: Zhou
dob: 2018-01-06
hobbies:
  - Travel
  - Eat
```

# Value as Set - eliminate duplicated elements

```yaml
numbers: !!set
? one
? two
? three
```

Same as:

```yaml
numbers: !!set {'one', 'two', 'three'}
```

Or same as

```yaml
numbers:
  one: null
  two: null
  three: null
```

# Value as Binary

```yaml
---
# binary is base64 encoded
picture: !!binary |
  R0lGODdhDQAIAIAAAAAAANn
  Z2SwAAAAADQAIAAACF4SDGQ
  ar3xxbJ9p0qa7R0YxwzaFME
  1IAADs=
```

# Value as List

## in line style list

```yaml
hobbies: ["Biking", "Sining", "Skiing"]
```

## individual line style list

```yaml
hobbies:
  - Biking
  - Singing
  - Skiing
```

### Complex List

```yaml
kids:
  - firstName: Angela
    lastName: Zhou
    age: 18
  - firstName: Lily
    lastName: Zhou
    age: 11
```

# Formatting in YAML

## Using `>`, `>+`, or `>-` for multiline value -- concatenate into one single line

## Using `|`, `|+`, or `|-` for multiline value -- perserve the format

# Anchor: `&anchorname` to define and `*anchorname` to use

## Use **Anchor** to represent constant

```yaml
name: &name George Zhou
company: Sunshine Tech
sigature: |
  George Zhou
  George.Zhou@sunshine.com
  888-666-5533
  
id: *name
```

## Use __Anchor__ to represent data strucutre

```yaml
Animal: &Animal
  breed: String
  price: Integer
  
Dog:
  <<: *Animal
  size: Integer

Cat:
  <<: *Animal
  weight: Integer
  outside: Boolean
```

# Change Data Type

```yaml
person:
  name: David Smith
  age:  !!float 38     #38.0
  waistSize: !!str 36
```

