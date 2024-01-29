package com.example.fams.controller;

import com.example.fams.dto.User.ChangePasswordDTORequest;
import com.example.fams.dto.User.UserDTO;
import com.example.fams.service.itf.UserService;
import com.example.fams.utils.ValidatorUtil;
import com.example.fams.utils.exceptions.UserNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class SettingController {
    private final UserService userService;
    private final ValidatorUtil validatorUtil;

    @GetMapping("account/details")
    public String accountDetails(Model model, RedirectAttributes redirectAttributes) {
        try {
            model.addAttribute("user", userService.getCurrentUserDto());
            return "account/details";
        } catch (Exception e) {
            redirectAttributes.addAttribute("error", e.getMessage());
            return "account/details";
        }
    }

    @PostMapping("account/details")
    public String accountDetailsPost(@Valid @ModelAttribute UserDTO user, BindingResult bindingResult, RedirectAttributes redirectAttributes) {
        if (bindingResult.hasErrors()) {
            redirectAttributes.addFlashAttribute("error", validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()).entrySet().iterator().next().getValue());
            return "redirect:/account/details";
        }

        try {
            userService.updateCurrentUser(user);
            redirectAttributes.addFlashAttribute("success", "Cập nhật thông tin thành công");
            return "redirect:/account/details";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
            return "redirect:/account/details";
        }
    }

    @GetMapping("account/change-password")
    public String changePassword() {
        return "account/change-password";
    }

    @PostMapping("account/change-password")
    public String changePasswordPost(@Valid @ModelAttribute ChangePasswordDTORequest dto, BindingResult bindingResult, RedirectAttributes redirectAttributes) {
        if (bindingResult.hasErrors()) {
            redirectAttributes.addFlashAttribute("error", validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
            return "redirect:/account/change-password";
        }

        try {
            userService.changePasswordByUsername(dto);
            redirectAttributes.addFlashAttribute("success", "Đổi mật khẩu thành công");
            return "redirect:/account/change-password";
        } catch (UserNotFoundException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
            return "redirect:/account/change-password";
        } catch (Exception e) {
            if (e.getMessage().equals("Confirm password does not match")) {
                Map<String, Object> map = new HashMap<>();
                map.put("newPassword", e.getMessage());
                redirectAttributes.addFlashAttribute("error", map);
                return "redirect:/account/change-password";
            }
            Map<String, Object> map = new HashMap<>();
            map.put("oldPassword", e.getMessage());
            redirectAttributes.addFlashAttribute("error", map);
            return "redirect:/account/change-password";
        }
    }
}
