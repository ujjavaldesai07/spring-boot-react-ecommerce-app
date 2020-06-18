package com.ujjaval.ecommerce.authenticationservice.controller;

import com.ujjaval.ecommerce.authenticationservice.entity.UserInfo;
import com.ujjaval.ecommerce.authenticationservice.model.AccountCreationRequest;
import com.ujjaval.ecommerce.authenticationservice.model.AccountCreationResponse;
import com.ujjaval.ecommerce.authenticationservice.model.AuthenticationRequest;
import com.ujjaval.ecommerce.authenticationservice.model.AuthenticationResponse;
import com.ujjaval.ecommerce.authenticationservice.service.AuthDataService;
import com.ujjaval.ecommerce.authenticationservice.service.CustomUserDetailsService;
import com.ujjaval.ecommerce.authenticationservice.util.JwtUtil;
import com.ujjaval.ecommerce.authenticationservice.util.Md5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private AuthDataService authDataService;

    @GetMapping(value = "/resources1")
    public ResponseEntity<InputStreamResource> getImage1() throws IOException {

        var imgFile = new ClassPathResource("static/images/b1.png");
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(new InputStreamResource(imgFile.getInputStream()));
    }

    @GetMapping(value = "/resources2")
    public ResponseEntity<InputStreamResource> getImage2() throws IOException {
        String mediaType = "image/webp";
        String path = "static/images/s1.webp";
        var imgFile = new ClassPathResource(path);
        return ResponseEntity
                .ok()
                .contentType(MediaType.parseMediaType(mediaType))
                .body(new InputStreamResource(imgFile.getInputStream()));
    }

    @GetMapping("/hello")
    public String firstPage() {
        return "Hello World";
    }

    public void loop() {
        while (true) {
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createAccount(
            @RequestBody AccountCreationRequest accountCreationRequest)
            throws Exception {

        if (authDataService.findByEmail(accountCreationRequest.getEmail()) != null) {
            return ResponseEntity.ok(
                    new AccountCreationResponse("failure", "Email already exist"));
        }

        UserInfo userInfo = new UserInfo();
        userInfo.setEmail(accountCreationRequest.getEmail());
        userInfo.setFirstName(accountCreationRequest.getFirstname());
        userInfo.setLastName(accountCreationRequest.getLastname());
        userInfo.setPassword(accountCreationRequest.getPassword());
        userInfo.setUserName(accountCreationRequest.getUsername());

        authDataService.createUserProfile(userInfo);
        return ResponseEntity.ok(new AccountCreationResponse("success", null));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(
            @RequestHeader(value = "Authorization", required = true) String headerData)
            throws Exception {

        AuthenticationRequest authenticationRequest = new AuthenticationRequest();
        String[] data = headerData.split(" ");
        byte[] decoded = Base64.getDecoder().decode(data[1]);
        String decodedStr = new String(decoded, StandardCharsets.UTF_8);
        data = decodedStr.split(":");

        authenticationRequest.setUsername(data[0]);
        authenticationRequest.setPassword(data[1]);

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                            Md5Util.getInstance().getMd5Hash(authenticationRequest.getPassword()))
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.ok(new AuthenticationResponse(null, "Incorrect username or password."));
        } catch (Exception e) {
            return ResponseEntity.ok(new AuthenticationResponse(null, "Username does not exist."));
        }

        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt, null));
    }
}
