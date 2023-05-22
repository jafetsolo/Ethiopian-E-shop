package com.example.ingredient.Service;

import com.example.ingredient.Dtos.ItemDto;
import com.example.ingredient.Model.Item;
import com.example.ingredient.Repository.ItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@AllArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final CloudinaryService cloudinaryService;

    public ResponseEntity<?> getAll(String searchQuery,
                                    Double priceMin ,
                                    Double priceMax,
                                    int pageStart){
        Map<String,Object> result = new HashMap<>();
        String nameQuery = Objects.nonNull(searchQuery)?searchQuery+"%": "%%";
        String descQuery =
                Objects.nonNull(searchQuery)
                        ?searchQuery.length() > 3
                        ? "%"+searchQuery+"%"
                        :"%%"
                        : "%%";
        Page<Item> items = itemRepository.findByBothPriceAndSearch(
                nameQuery,
                descQuery,
                priceMin,
                priceMax,
                PageRequest.of(pageStart,10));
        result.put("result",items.getContent());
        result.put("total", items.getTotalElements());
        return ResponseEntity.ok(result);
    }

    public ResponseEntity<?> get(Long id){
        Optional<Item> item = itemRepository.findById(id);
        if(item.isPresent()){
            return ResponseEntity.ok(item.get());
        }else{
            return new ResponseEntity<>( "Not Found",HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> add(MultipartFile image,ItemDto itemDto){
        try{
            String imagePath = cloudinaryService.uploadFile(image);
            Item newItem = new Item();
            newItem.setDescription(itemDto.getDescription());
            newItem.setImage(imagePath);
            newItem.setPrice(itemDto.getPrice());
            newItem.setName(itemDto.getName());
            Item savedItem = itemRepository.save(newItem);
            return ResponseEntity.ok(savedItem);
        }catch (Exception exception){
            return new ResponseEntity<>( "Unable to Save",HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> edit(Long id,ItemDto newItem){
        try{
            Optional<Item> item = itemRepository.findById(id);
            if(item.isPresent()){
                if(Objects.nonNull(newItem.getImage())){
                    cloudinaryService.delete(item.get().getImage());
                    String imagePath = cloudinaryService.uploadFile(newItem.getImage());
                    item.get().setImage(imagePath);
                }
                item.get().setPrice(newItem.getPrice());
                item.get().setDescription(newItem.getDescription());
                item.get().setName(newItem.getName());
                Item savedItem = itemRepository.save(item.get());
                return ResponseEntity.ok(savedItem);
            }else{
                return new ResponseEntity<>( "Item Not Found",HttpStatus.BAD_REQUEST);
            }
        }catch (Exception exception){
            return new ResponseEntity<>( "Unable to Edit",HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> delete(Long id){
        Optional<Item> item = itemRepository.findById(id);
        if(item.isPresent()){
            cloudinaryService.delete(item.get().getImage());
            itemRepository.deleteById(id);
            return ResponseEntity.ok("Deleted");
        }else{
            return new ResponseEntity<>( "Not Found",HttpStatus.BAD_REQUEST);
        }
    }

}
