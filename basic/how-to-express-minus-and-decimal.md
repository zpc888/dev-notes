## how to express minus

### How

1. Express its plus first
2. Complement its plus number
3. Add 1 on its complementary of plus number
4. E.g. -2 in byte type

```
# plus 2 
0000 0010     # 0x 02
# complement
1111 1101     # 0x FD
# add 1
1111 1110     # 0x FE
```

### Why

* for consistently add plus and plus, plus and minus, minus and plus, and minus and minus

## how to express decimal

### How

1. Express its integral part as normal;
2. Express its fractional part by multiple 2 to take the integral bit, i.e. 0 or 1;
3. Recursively multiple 2 from the fractional part of #2 result UNTIL its fractional part is zero, or reaching the precision length
4. Combine its integral and fractional part together
5. Use "strict" scientific method in binary to represent #4 result (strict means its integral part must be 1 [unless it is zero] and has one and only one bit)
6. Disposition of sign-bit, exponent-bits and tail-bits. Java float, the length of sign-bit is 1, length of exponent-bits is 8 bits, length of tail-bits is 23 bits; java double  has 1 sign-bit, 11 exponent-bits and 52 tail-bits. The longer of expoent part can express more range of number, the longer of tail-bits can express more accurate number
7. Formula is: (-1)^(sign-bit-value) * (1+tail-bits-value)*(2)^(exponent-bits-value - offset) where offset is 2^8-1 = 127 for java float; 2^11-1 = 1023
8. Why needs offset for exponent-bits-value? Because exponent-bit-value can be negative or positive number, to simplify calculation, try to express them always in positive number.
9. e.g. 3.625

```
# express integral part
011
# express fractional part
# 0.625 * 2 = 1.250     -> 1
# 0.250 * 2 = 0.50      -> 0
# 0.50 * 2  = 1.0       -> 1
101
# combine together
011.101
# strict scientific method
1.1101*2^1
# disposition in java float
# exponent-value = real-exponent-value + offset = 1 + 127 = 128
0 / 1000 0000 / 1101 0000 0000 0000 0000 000
```

e.g. 10.625

```
# express integral part
1010
# express fractional part
101
# combine together
1010.101
# strict scientific method
1.010101*2^3
# disposition in java float
# exponent-value = real-exponent-value + offset = 3 + 127 = 130
0 / 1000 0010 / 0101 0100 0000 0000 0000 000
```

