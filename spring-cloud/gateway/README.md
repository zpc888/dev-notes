[Spring Cloud Gateway Reference Guide](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/)

# Glossary

* __Route__: The basic building block of the gateway. It is defined by
  * an ID
  * a destination URI
  * a collection of predicates
  * a collection of filters
  * A route is matched if the aggregate predicate is true
* __Predicate__: Java 8 Function Predicate.
  * Its input type is a `Spring Framework ServerWebExchange`
  * Let you match on anything from the HTTP request, such as headers or parameters
* __Filter__: These are instances of `GatewayFilter` that have been constructed with a specific factory
  * Here, you can modify requests and responses before or after sending the downstream request

# Configuring Route Predicate Factories and Gateway Filter Factories

* Shortcut Configuration

* Fully expanded arguments

# Route Predicate Factories

1. The After Route Predicate Factory
2. The Before Route Predicate Factory
3. The Betwee Route Predicate Factory
4. The Cookie Route Predicate Factory
5. The Header Route Predicate Factory
6. The Host Route Predicate Factory
7. The Method Route Predicate Factory
8. The Path Route Predicate Factory
9. The Query Route Predicate Factory
10. The RemoteAddr Route Predicate Factory
11. The Weight Route Predicate Factory

# GatewayFilter Factories

1. The AddRequestHeader GatewayFilter Factory
2. The AddRequestParameter GatewayFilter Factory
3. The AddResponseHeader GatewayFilter Factory
4. The DedupeResponseHeader GatewayFilter Factory
5. Spring Cloud CircleBreaker GatewayFilter Factory
6. The FallbackHeaders GatewayFilter Factory
7. The MapRequestHeader GatewayFilter Factory
8. The PrefixPath GatewayFilter Factory
9. The PreserveHostHeader GatewayFilter Factory
10. The RequestRateLimiter GatewayFilter Factory
11. The RedirectTo GatewayFilter Factory
12. The RemoveRequestHeader GatewayFilter Factory
13. The RemoveResponseHeader GatewayFilter Factory
14. The RemoveRequestParameter GatewayFilter Factory
15. The RewritePath GatewayFilter Factory
16. The RewriteLocationResponseHeader GatewayFilter Factory
17. The RewriteResponseHeader GatewayFilter Factory
18. The SaveSession GatewayFilter Factory
19. The SecureHeaders GatewayFilter Factory
20. The SetPath GatewayFilter Factory
21. The SetRequestHeader GatewayFilter Factory
22. The SetResponseHeader GatewayFilter Factory
23. The SetStatus GatewayFilter Factory
24. The StripPrefix GatewayFilter Factory
25. The Retry GatewayFilter Factory
26. The RequestSize GatewayFilter Factory
27. The SetRequestHostHeader GatewayFilter Factory
28. Modify a Request Body GatewayFilter Factory
29. Modify a Response Body GatewayFilter Factory
30. Token Relay GatewayFilter Factory
31. Default Filters

# Global Filters

# HttpHeadersFilters

# TLS and SSL

# Configuration

# Route Metadata Configuration

# Http timeouts Configuration

# Reactor Netty Access Logs

# CORS Configuration

# Actuator API



